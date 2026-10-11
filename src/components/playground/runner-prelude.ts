/**
 * Python that the worker runs once, right after Pyodide boots. It defines
 * `_cwp_run`, which every student run goes through, so that:
 *
 * - each run gets a fresh `__main__` namespace (variables never leak between
 *   runs, the way they would in a REPL);
 * - tracebacks start at the student's own `main.py`, not inside Pyodide;
 * - `input()` reads from the answers the student typed in advance, because a
 *   worker cannot pause mid-run to ask (that needs SharedArrayBuffer, which
 *   needs cross-origin isolation headers the site does not send);
 * - matplotlib draws with Agg and `plt.show()` hands each figure back as a PNG.
 *
 * `cwp_bridge` is a JS module the worker registers before this runs.
 */
export const RUNNER_PRELUDE = String.raw`
import base64
import builtins
import io
import json
import linecache
import os
import sys
import traceback

os.environ["MPLBACKEND"] = "AGG"

import cwp_bridge

_CWP_MODULE_HINT = (
    "That module isn't available in the browser. The standard library works, "
    "plus numpy, pandas, scikit-learn, scipy and matplotlib."
)

_CWP_HINTS = {
    "SyntaxError": "Python couldn't read this line. Look for a missing colon, bracket or quote on it, or on the line just above.",
    "IndentationError": "The spaces at the start of a line don't line up. Every line in a block needs the same indent, usually 4 spaces.",
    "TabError": "This line mixes tabs and spaces. Use spaces only; the Tab key here inserts 4 spaces.",
    "NameError": "Python doesn't know that name yet. Check the spelling, and make sure the line that creates it runs first.",
    "TypeError": "A value was used in a way its type doesn't allow, such as adding a number to a string.",
    "ValueError": "The type was right but the value wasn't, such as int('hello').",
    "IndexError": "That position is past the end of the list. Positions start at 0, so the last item is len(items) - 1.",
    "KeyError": "That key isn't in the dictionary. Check its spelling, or use .get() to fall back to a default.",
    "AttributeError": "That value has no attribute or method with this name. Check the spelling and what type the value is.",
    "ZeroDivisionError": "Something was divided by zero.",
    "ModuleNotFoundError": _CWP_MODULE_HINT,
    "ImportError": _CWP_MODULE_HINT,
    "RecursionError": "A function kept calling itself and never stopped. Check that it has a base case it can reach.",
    "FileNotFoundError": "The browser has its own empty file system, so files on your computer aren't here. Create the file in code first.",
    "EOFError": "The program asked for more input() than you gave it. Type one answer per line in the input box, then run again.",
    "OSError": "The browser sandbox can't reach the network or your files, so this operation isn't possible here.",
}


def _cwp_find_imports(source):
    from pyodide.code import find_imports

    return json.dumps(find_imports(source))


def _cwp_input_from(answers):
    queue = list(answers)

    def _input(prompt=""):
        sys.stdout.write(str(prompt))
        if not queue:
            sys.stdout.write("\n")
            raise EOFError("input() was called, but there are no answers left in the input box")
        answer = queue.pop(0)
        # Echo the answer, so the console reads like a real terminal session.
        sys.stdout.write(answer + "\n")
        return answer

    return _input


def _cwp_emit_figures():
    plt = sys.modules.get("matplotlib.pyplot")
    if plt is None:
        return
    for number in plt.get_fignums():
        buffer = io.BytesIO()
        plt.figure(number).savefig(buffer, format="png", dpi=110, bbox_inches="tight")
        cwp_bridge.figure(base64.b64encode(buffer.getvalue()).decode("ascii"))
    plt.close("all")


def _cwp_prepare_matplotlib():
    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    # Agg cannot open a window; show() becomes "send what's drawn so far".
    plt.show = lambda *args, **kwargs: _cwp_emit_figures()


def _cwp_describe(exc):
    tb = exc.__traceback__
    # The first frame is _cwp_run's own exec() call; the student never wrote it.
    if tb is not None and tb.tb_frame.f_code.co_filename != "main.py":
        tb = tb.tb_next
    text = "".join(traceback.format_exception(type(exc), exc, tb))

    line = None
    if isinstance(exc, SyntaxError) and exc.filename == "main.py":
        line = exc.lineno
    else:
        for frame in traceback.extract_tb(tb):
            if frame.filename == "main.py":
                line = frame.lineno

    name = type(exc).__name__
    if isinstance(exc, SyntaxError):
        message = exc.msg
    else:
        message = str(exc)
    return json.dumps(
        {
            "type": name,
            "message": message,
            "line": line,
            "traceback": text.rstrip(),
            "hint": _CWP_HINTS.get(name),
        }
    )


def _cwp_run(source, answers, wants_matplotlib):
    builtins.input = _cwp_input_from(answers)
    # Lets tracebacks quote the offending line of main.py, as they would for
    # a real file on disk.
    linecache.cache["main.py"] = (len(source), None, source.splitlines(True), "main.py")
    namespace = {"__name__": "__main__", "__builtins__": builtins}
    try:
        if wants_matplotlib:
            _cwp_prepare_matplotlib()
        exec(compile(source, "main.py", "exec"), namespace)
        _cwp_emit_figures()
    except SystemExit as exc:
        if exc.code not in (None, 0):
            return _cwp_describe(exc)
    except BaseException as exc:
        return _cwp_describe(exc)
    finally:
        sys.stdout.flush()
        sys.stderr.flush()
    return None
`;
