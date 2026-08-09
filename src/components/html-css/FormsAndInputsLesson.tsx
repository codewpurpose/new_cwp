import { Lead, LessonSection, P, Strong } from "@/components/learn/primitives/LessonSection";
import { Callout } from "@/components/learn/primitives/Callout";
import { CodeBlock } from "@/components/learn/primitives/CodeBlock";
import { CompareGrid, LabelRows, TakeawayCard } from "@/components/learn/primitives/Cards";

export function FormsAndInputsLesson() {
  return (
    <div>
      <Lead>
        A form is the only part of HTML that sends data anywhere, and one unlabelled input is the
        difference between a usable form and an unusable one. Meet the input types that give phones
        the right keyboard for free.
      </Lead>

      <LessonSection
        id="a-form-wraps-the-inputs-and-says-where-they-go"
        title="A form wraps the inputs and says where they go"
      >
        <P>
          <Strong>&lt;form&gt;</Strong> is a container with two attributes that decide what happens
          when it is submitted.
        </P>
        <CodeBlock
          label="A complete form"
          code={`<form action="/subscribe" method="post">
  <label for="email">Email address</label>
  <input type="email" id="email" name="email" required>

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="4"></textarea>

  <button type="submit">Send</button>
</form>`}
        />
        <LabelRows
          rows={[
            { label: "action", text: "Where the data goes. A URL on your server, or a form service. Omit it and the form submits back to the current page." },
            { label: "method", text: 'post puts the data in the request body — for anything that changes something, or is private. get puts it in the URL as ?name=value, which is right for a search box because the result is then linkable.' },
            { label: "name", text: "On each input, this is the KEY the server receives. An input with no name is not submitted at all — this is the commonest reason a field silently goes missing." },
            { label: "id", text: "Different job entirely: it joins the input to its label. You need both, and they usually match." },
          ]}
        />
        <Callout tone="note" title="HTML sends the data; something else has to receive it">
          A form on a static site has nowhere to post to. The options are a form service — Formspree,
          Netlify Forms, Google Forms — or a{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">mailto:</span> action, which
          opens the visitor&apos;s email client and is clumsy. Building the receiving end is
          server-side work and outside this track.
        </Callout>
      </LessonSection>

      <LessonSection
        id="every-input-needs-a-label-that-is-joined-to-it"
        title="Every input needs a label that is joined to it"
      >
        <P>
          This is the most important paragraph in the chapter. A <Strong>&lt;label&gt;</Strong> must
          be <em>programmatically associated</em> with its input, not merely sitting next to it.
        </P>
        <CodeBlock
          label="Two ways, both correct"
          code={`<!-- for matches id -->
<label for="email">Email address</label>
<input type="email" id="email" name="email">

<!-- or wrap it, and no ids are needed -->
<label>
  Email address
  <input type="email" name="email">
</label>`}
        />
        <P>
          Two things follow, and one of them is visible to everybody:
        </P>
        <CompareGrid
          items={[
            {
              title: "For screen reader users",
              tone: "positive",
              children: (
                <P>
                  Focusing the field announces &quot;Email address, edit text&quot;. Unlabelled, it
                  announces &quot;edit text&quot; — a box with no indication of what belongs in it,
                  in a form of six identical boxes.
                </P>
              ),
            },
            {
              title: "For everybody",
              tone: "positive",
              children: (
                <P>
                  Clicking the label focuses the field, which makes the whole label a target rather
                  than the box alone. On a checkbox that turns a 16-pixel tap target into a
                  comfortable one, which matters enormously on a phone.
                </P>
              ),
            },
          ]}
        />
        <P>
          Group related controls with <Strong>fieldset</Strong> and <Strong>legend</Strong> — a set
          of radio buttons genuinely needs this, because each radio has its own label and the
          question they answer has nowhere else to live.
        </P>
        <CodeBlock
          label="A group of radios"
          code={`<fieldset>
  <legend>How did you hear about us?</legend>

  <label><input type="radio" name="source" value="friend"> A friend</label>
  <label><input type="radio" name="source" value="search"> Search</label>
  <label><input type="radio" name="source" value="social"> Social media</label>
</fieldset>`}
        />
        <P>
          Note the shared <Strong>name</Strong>. That is what makes them one group where selecting
          one deselects the others — radios with different names are unrelated and all selectable at
          once.
        </P>
      </LessonSection>

      <LessonSection id="the-type-attribute-changes-the-keyboard" title="The type attribute changes the keyboard">
        <P>
          <Strong>&lt;input&gt;</Strong> is one element that becomes about twenty different controls
          depending on its <Strong>type</Strong>. On a phone, the type also decides which keyboard
          appears — which is real usability for one attribute.
        </P>
        <LabelRows
          rows={[
            { label: "text", text: "The default. Anything." },
            { label: "email", text: "Keyboard with @ and a dot. Validates the shape on submit." },
            { label: "tel", text: "Numeric keypad. No validation — phone number formats vary too much worldwide to check." },
            { label: "url", text: "Keyboard with / and .com. Requires a scheme like https://." },
            { label: "number", text: "Numeric, with min, max, and step. Not for phone numbers, postcodes, or card numbers — those are text that happens to contain digits." },
            { label: "password", text: "Masks the characters. Note that it does not encrypt anything; that is https's job." },
            { label: "date / time", text: "A native picker, which differs between browsers and is usually still better than three dropdowns." },
            { label: "checkbox / radio", text: "Many-of-many, and one-of-many. Radios in a group share a name." },
            { label: "file", text: "A file picker. Add accept=\"image/*\" to filter it." },
            { label: "search / color / range", text: "A search box with a clear button, a colour picker, and a slider respectively." },
          ]}
        />
        <P>
          The other form controls are separate elements rather than input types:
        </P>
        <CodeBlock
          label="Not inputs"
          code={`<textarea id="bio" name="bio" rows="5"></textarea>

<select id="country" name="country">
  <option value="">Choose…</option>
  <option value="uk">United Kingdom</option>
  <option value="in">India</option>
</select>

<button type="submit">Send</button>
<button type="button">Does not submit</button>`}
        />
        <Callout tone="warning" title="A button inside a form submits by default">
          <span className="font-[family-name:var(--learn-font-mono)]">&lt;button&gt;</span> with no
          type is{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">type=&quot;submit&quot;</span>.
          So a &quot;Add another&quot; button submits the form and reloads the page, which looks like
          the form randomly resetting itself. Always write{" "}
          <span className="font-[family-name:var(--learn-font-mono)]">type=&quot;button&quot;</span>{" "}
          on anything that is not the submit.
        </Callout>
        <P>
          Also note the closing tag on <Strong>&lt;textarea&gt;</Strong> — it wraps content, unlike{" "}
          <Strong>&lt;input&gt;</Strong>, which is void. Any whitespace between the tags becomes the
          field&apos;s starting value, so write them together.
        </P>
      </LessonSection>

      <LessonSection
        id="placeholder-is-not-a-label-and-never-was"
        title="placeholder is not a label, and never was"
      >
        <P>
          Placeholder text looks like a tidy way to skip labels. It fails in four separate ways, and
          it is worth knowing all of them because the design keeps coming back.
        </P>
        <CodeBlock
          label="The pattern to avoid"
          copyable={false}
          code={`<input type="email" name="email" placeholder="Email address">`}
          lineTones={{ 0: "err" }}
        />
        <LabelRows
          rows={[
            { label: "It disappears", text: "The moment somebody types. Now they cannot check what the field was for, and neither can anyone reviewing a half-filled form." },
            { label: "It is low contrast", text: "Grey on white by design, so it is the least readable text on the page — and darkening it makes the field look already filled in." },
            { label: "Screen reader support varies", text: "Some announce it, some do not, some read it only when the field is empty. It is not a reliable label anywhere." },
            { label: "It reads as filled", text: "Users skip fields that appear to already have content. This is a documented, repeated finding in usability testing." },
          ]}
        />
        <P>
          Use a real label. Placeholder is for an <em>example</em> that supplements the label —{" "}
          <Strong>&quot;e.g. +44 7700 900123&quot;</Strong> under a &quot;Phone number&quot; label —
          and even then a small hint below the field is usually better, because it stays visible.
        </P>
        <CodeBlock
          label="Label, and hint"
          code={`<label for="phone">Phone number</label>
<input type="tel" id="phone" name="phone" aria-describedby="phone-hint">
<p id="phone-hint" class="hint">Include the country code, e.g. +44 7700 900123</p>`}
        />
      </LessonSection>

      <LessonSection
        id="the-browser-validates-before-your-server-does"
        title="The browser validates before your server does"
      >
        <P>
          Several attributes make the browser check a field before it will submit, with no JavaScript
          at all.
        </P>
        <CodeBlock
          label="Built-in validation"
          code={`<input type="email" required>
<input type="text" minlength="2" maxlength="60" required>
<input type="number" min="1" max="120" step="1">
<input type="text" pattern="[A-Za-z0-9]{6}" title="Six letters or digits">`}
        />
        <LabelRows
          rows={[
            { label: "required", text: "Cannot be empty. Boolean — present means true." },
            { label: "minlength / maxlength", text: "Character limits on text. maxlength stops typing; minlength blocks submission." },
            { label: "min / max / step", text: "For numbers, dates, and ranges." },
            { label: "pattern", text: "A regular expression. Always add a title — it becomes the error message, and without one the browser says something unhelpfully generic." },
          ]}
        />
        <Callout tone="danger" title="Client-side validation is a convenience, not a defence">
          Every one of these can be removed in devtools in about four seconds, and a request can be
          sent without ever loading your page. They exist to help an honest person fix a typo before
          a round trip. <Strong>Anything arriving at a server must be validated there too</Strong> —
          the browser checks are a nicety, and treating them as security is how injection bugs
          happen.
        </Callout>
        <P>
          One more attribute worth knowing, because it is invisible and helps enormously:{" "}
          <Strong>autocomplete</Strong>. It tells the browser what a field is for, so it can offer
          the right saved value.
        </P>
        <CodeBlock
          label="Let the browser fill it in"
          code={`<input type="email"  name="email" autocomplete="email">
<input type="text"   name="name"  autocomplete="name">
<input type="text"   name="addr"  autocomplete="street-address">
<input type="password" name="pw"  autocomplete="current-password">`}
        />
        <P>
          There are about fifty defined values. Using them means fewer keystrokes for everybody and
          far fewer for anyone with a motor impairment — which is the pattern for most of this
          chapter: the accessible version is also the more convenient one.
        </P>
      </LessonSection>

      <TakeawayCard
        items={[
          "A form's action says where data goes; method post puts it in the body, get puts it in the URL.",
          "An input with no name attribute is not submitted at all.",
          "name is the key the server sees; id is what joins the input to its label. You need both.",
          "Every input needs a label joined by for/id or by wrapping. Clicking the label focuses the field.",
          "fieldset and legend group radios and checkboxes, because the question needs somewhere to live.",
          "Radios in one group share a name; different names means they are unrelated.",
          "type changes the phone keyboard as well as the control. Use tel, email, url, number appropriately.",
          "A <button> in a form submits unless you write type=\"button\".",
          "placeholder is not a label: it vanishes, is low contrast, is inconsistently announced, and makes fields look filled.",
          "required, pattern, min and max are conveniences that can be removed in devtools — always validate on the server too.",
          "autocomplete lets the browser fill fields in, which helps everybody and helps some people a great deal.",
        ]}
      />
    </div>
  );
}
