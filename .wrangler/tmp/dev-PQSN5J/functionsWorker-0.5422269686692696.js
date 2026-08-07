var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/pages-AT6SGx/functionsWorker-0.5422269686692696.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var json = /* @__PURE__ */ __name2((data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8" }
}), "json");
var html = /* @__PURE__ */ __name2((markup, status = 200) => new Response(markup, {
  status,
  headers: { "content-type": "text/html; charset=utf-8" }
}), "html");
var isValidEmail = /* @__PURE__ */ __name2((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "isValidEmail");
var normalizeUrl = /* @__PURE__ */ __name2((value) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}, "normalizeUrl");
var isValidWebUrl = /* @__PURE__ */ __name2((value) => {
  if (!value) return true;
  try {
    const u = new URL(value);
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname.includes(".");
  } catch {
    return false;
  }
}, "isValidWebUrl");
var newToken = /* @__PURE__ */ __name2((bytes = 32) => {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}, "newToken");
var escapeHtml = /* @__PURE__ */ __name2((s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"), "escapeHtml");
var readBody = /* @__PURE__ */ __name2(async (request) => {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    try {
      const data = await request.json();
      const out2 = {};
      for (const [k, v] of Object.entries(data)) out2[k] = String(v ?? "").trim();
      return out2;
    } catch {
      return {};
    }
  }
  const form = await request.formData();
  const out = {};
  for (const [k, v] of form.entries()) out[k] = String(v ?? "").trim();
  return out;
}, "readBody");
var statusPage = /* @__PURE__ */ __name2((siteUrl, title, body) => `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${escapeHtml(title)} | Freedom with AI</title>
<style>
  :root { color-scheme: light; }
  body { margin:0; min-height:100vh; display:grid; place-items:center;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background:#f7f4ed; color:#15181b; padding:24px; }
  .card { max-width:30rem; text-align:center; background:#fffdf8;
    border:1px solid rgba(21,24,27,.12); border-radius:20px; padding:48px 32px;
    box-shadow:0 16px 32px rgba(21,24,27,.08); }
  h1 { font-size:1.4rem; margin:0 0 12px; letter-spacing:-.015em; }
  p { color:#52555a; line-height:1.65; margin:0 0 24px; }
  a { display:inline-block; font-weight:600; color:#fff; background:#1a73e8;
    text-decoration:none; padding:12px 24px; border-radius:14px; }
</style>
</head><body>
  <div class="card">
    <h1>${escapeHtml(title)}</h1>
    <p>${body}</p>
    <a href="${escapeHtml(siteUrl)}">Back to Freedom with AI</a>
  </div>
</body></html>`, "statusPage");
var encoder = new TextEncoder();
var HOST_SERVICES = {
  appstream2: "appstream",
  cloudhsmv2: "cloudhsm",
  email: "ses",
  marketplace: "aws-marketplace",
  mobile: "AWSMobileHubService",
  pinpoint: "mobiletargeting",
  queue: "sqs",
  "git-codecommit": "codecommit",
  "mturk-requester-sandbox": "mturk-requester",
  "personalize-runtime": "personalize"
};
var UNSIGNABLE_HEADERS = /* @__PURE__ */ new Set([
  "authorization",
  "content-type",
  "content-length",
  "user-agent",
  "presigned-expires",
  "expect",
  "x-amzn-trace-id",
  "range",
  "connection"
]);
var AwsClient = class {
  static {
    __name(this, "AwsClient");
  }
  static {
    __name2(this, "AwsClient");
  }
  constructor({ accessKeyId, secretAccessKey, sessionToken, service, region, cache, retries, initRetryMs }) {
    if (accessKeyId == null) throw new TypeError("accessKeyId is a required option");
    if (secretAccessKey == null) throw new TypeError("secretAccessKey is a required option");
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.sessionToken = sessionToken;
    this.service = service;
    this.region = region;
    this.cache = cache || /* @__PURE__ */ new Map();
    this.retries = retries != null ? retries : 10;
    this.initRetryMs = initRetryMs || 50;
  }
  async sign(input, init) {
    if (input instanceof Request) {
      const { method, url, headers, body } = input;
      init = Object.assign({ method, url, headers }, init);
      if (init.body == null && headers.has("Content-Type")) {
        init.body = body != null && headers.has("X-Amz-Content-Sha256") ? body : await input.clone().arrayBuffer();
      }
      input = url;
    }
    const signer = new AwsV4Signer(Object.assign({ url: input.toString() }, init, this, init && init.aws));
    const signed = Object.assign({}, init, await signer.sign());
    delete signed.aws;
    try {
      return new Request(signed.url.toString(), signed);
    } catch (e) {
      if (e instanceof TypeError) {
        return new Request(signed.url.toString(), Object.assign({ duplex: "half" }, signed));
      }
      throw e;
    }
  }
  async fetch(input, init) {
    for (let i = 0; i <= this.retries; i++) {
      const fetched = fetch(await this.sign(input, init));
      if (i === this.retries) {
        return fetched;
      }
      const res = await fetched;
      if (res.status < 500 && res.status !== 429) {
        return res;
      }
      await new Promise((resolve) => setTimeout(resolve, Math.random() * this.initRetryMs * Math.pow(2, i)));
    }
    throw new Error("An unknown error occurred, ensure retries is not negative");
  }
};
var AwsV4Signer = class {
  static {
    __name(this, "AwsV4Signer");
  }
  static {
    __name2(this, "AwsV4Signer");
  }
  constructor({ method, url, headers, body, accessKeyId, secretAccessKey, sessionToken, service, region, cache, datetime, signQuery, appendSessionToken, allHeaders, singleEncode }) {
    if (url == null) throw new TypeError("url is a required option");
    if (accessKeyId == null) throw new TypeError("accessKeyId is a required option");
    if (secretAccessKey == null) throw new TypeError("secretAccessKey is a required option");
    this.method = method || (body ? "POST" : "GET");
    this.url = new URL(url);
    this.headers = new Headers(headers || {});
    this.body = body;
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.sessionToken = sessionToken;
    let guessedService, guessedRegion;
    if (!service || !region) {
      [guessedService, guessedRegion] = guessServiceRegion(this.url, this.headers);
    }
    this.service = service || guessedService || "";
    this.region = region || guessedRegion || "us-east-1";
    this.cache = cache || /* @__PURE__ */ new Map();
    this.datetime = datetime || (/* @__PURE__ */ new Date()).toISOString().replace(/[:-]|\.\d{3}/g, "");
    this.signQuery = signQuery;
    this.appendSessionToken = appendSessionToken || this.service === "iotdevicegateway";
    this.headers.delete("Host");
    if (this.service === "s3" && !this.signQuery && !this.headers.has("X-Amz-Content-Sha256")) {
      this.headers.set("X-Amz-Content-Sha256", "UNSIGNED-PAYLOAD");
    }
    const params = this.signQuery ? this.url.searchParams : this.headers;
    params.set("X-Amz-Date", this.datetime);
    if (this.sessionToken && !this.appendSessionToken) {
      params.set("X-Amz-Security-Token", this.sessionToken);
    }
    this.signableHeaders = ["host", ...this.headers.keys()].filter((header) => allHeaders || !UNSIGNABLE_HEADERS.has(header)).sort();
    this.signedHeaders = this.signableHeaders.join(";");
    this.canonicalHeaders = this.signableHeaders.map((header) => header + ":" + (header === "host" ? this.url.host : (this.headers.get(header) || "").replace(/\s+/g, " "))).join("\n");
    this.credentialString = [this.datetime.slice(0, 8), this.region, this.service, "aws4_request"].join("/");
    if (this.signQuery) {
      if (this.service === "s3" && !params.has("X-Amz-Expires")) {
        params.set("X-Amz-Expires", "86400");
      }
      params.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
      params.set("X-Amz-Credential", this.accessKeyId + "/" + this.credentialString);
      params.set("X-Amz-SignedHeaders", this.signedHeaders);
    }
    if (this.service === "s3") {
      try {
        this.encodedPath = decodeURIComponent(this.url.pathname.replace(/\+/g, " "));
      } catch (e) {
        this.encodedPath = this.url.pathname;
      }
    } else {
      this.encodedPath = this.url.pathname.replace(/\/+/g, "/");
    }
    if (!singleEncode) {
      this.encodedPath = encodeURIComponent(this.encodedPath).replace(/%2F/g, "/");
    }
    this.encodedPath = encodeRfc3986(this.encodedPath);
    const seenKeys = /* @__PURE__ */ new Set();
    this.encodedSearch = [...this.url.searchParams].filter(([k]) => {
      if (!k) return false;
      if (this.service === "s3") {
        if (seenKeys.has(k)) return false;
        seenKeys.add(k);
      }
      return true;
    }).map((pair) => pair.map((p) => encodeRfc3986(encodeURIComponent(p)))).sort(([k1, v1], [k2, v2]) => k1 < k2 ? -1 : k1 > k2 ? 1 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0).map((pair) => pair.join("=")).join("&");
  }
  async sign() {
    if (this.signQuery) {
      this.url.searchParams.set("X-Amz-Signature", await this.signature());
      if (this.sessionToken && this.appendSessionToken) {
        this.url.searchParams.set("X-Amz-Security-Token", this.sessionToken);
      }
    } else {
      this.headers.set("Authorization", await this.authHeader());
    }
    return {
      method: this.method,
      url: this.url,
      headers: this.headers,
      body: this.body
    };
  }
  async authHeader() {
    return [
      "AWS4-HMAC-SHA256 Credential=" + this.accessKeyId + "/" + this.credentialString,
      "SignedHeaders=" + this.signedHeaders,
      "Signature=" + await this.signature()
    ].join(", ");
  }
  async signature() {
    const date = this.datetime.slice(0, 8);
    const cacheKey = [this.secretAccessKey, date, this.region, this.service].join();
    let kCredentials = this.cache.get(cacheKey);
    if (!kCredentials) {
      const kDate = await hmac("AWS4" + this.secretAccessKey, date);
      const kRegion = await hmac(kDate, this.region);
      const kService = await hmac(kRegion, this.service);
      kCredentials = await hmac(kService, "aws4_request");
      this.cache.set(cacheKey, kCredentials);
    }
    return buf2hex(await hmac(kCredentials, await this.stringToSign()));
  }
  async stringToSign() {
    return [
      "AWS4-HMAC-SHA256",
      this.datetime,
      this.credentialString,
      buf2hex(await hash(await this.canonicalString()))
    ].join("\n");
  }
  async canonicalString() {
    return [
      this.method.toUpperCase(),
      this.encodedPath,
      this.encodedSearch,
      this.canonicalHeaders + "\n",
      this.signedHeaders,
      await this.hexBodyHash()
    ].join("\n");
  }
  async hexBodyHash() {
    let hashHeader = this.headers.get("X-Amz-Content-Sha256") || (this.service === "s3" && this.signQuery ? "UNSIGNED-PAYLOAD" : null);
    if (hashHeader == null) {
      if (this.body && typeof this.body !== "string" && !("byteLength" in this.body)) {
        throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");
      }
      hashHeader = buf2hex(await hash(this.body || ""));
    }
    return hashHeader;
  }
};
async function hmac(key, string) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    typeof key === "string" ? encoder.encode(key) : key,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );
  return crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(string));
}
__name(hmac, "hmac");
__name2(hmac, "hmac");
async function hash(content) {
  return crypto.subtle.digest("SHA-256", typeof content === "string" ? encoder.encode(content) : content);
}
__name(hash, "hash");
__name2(hash, "hash");
var HEX_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
function buf2hex(arrayBuffer) {
  const buffer = new Uint8Array(arrayBuffer);
  let out = "";
  for (let idx = 0; idx < buffer.length; idx++) {
    const n = buffer[idx];
    out += HEX_CHARS[n >>> 4 & 15];
    out += HEX_CHARS[n & 15];
  }
  return out;
}
__name(buf2hex, "buf2hex");
__name2(buf2hex, "buf2hex");
function encodeRfc3986(urlEncodedStr) {
  return urlEncodedStr.replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}
__name(encodeRfc3986, "encodeRfc3986");
__name2(encodeRfc3986, "encodeRfc3986");
function guessServiceRegion(url, headers) {
  const { hostname, pathname } = url;
  if (hostname.endsWith(".on.aws")) {
    const match3 = hostname.match(/^[^.]{1,63}\.lambda-url\.([^.]{1,63})\.on\.aws$/);
    return match3 != null ? ["lambda", match3[1] || ""] : ["", ""];
  }
  if (hostname.endsWith(".r2.cloudflarestorage.com")) {
    return ["s3", "auto"];
  }
  if (hostname.endsWith(".backblazeb2.com")) {
    const match3 = hostname.match(/^(?:[^.]{1,63}\.)?s3\.([^.]{1,63})\.backblazeb2\.com$/);
    return match3 != null ? ["s3", match3[1] || ""] : ["", ""];
  }
  const match2 = hostname.replace("dualstack.", "").match(/([^.]{1,63})\.(?:([^.]{0,63})\.)?amazonaws\.com(?:\.cn)?$/);
  let service = match2 && match2[1] || "";
  let region = match2 && match2[2];
  if (region === "us-gov") {
    region = "us-gov-west-1";
  } else if (region === "s3" || region === "s3-accelerate") {
    region = "us-east-1";
    service = "s3";
  } else if (service === "iot") {
    if (hostname.startsWith("iot.")) {
      service = "execute-api";
    } else if (hostname.startsWith("data.jobs.iot.")) {
      service = "iot-jobs-data";
    } else {
      service = pathname === "/mqtt" ? "iotdevicegateway" : "iotdata";
    }
  } else if (service === "autoscaling") {
    const targetPrefix = (headers.get("X-Amz-Target") || "").split(".")[0];
    if (targetPrefix === "AnyScaleFrontendService") {
      service = "application-autoscaling";
    } else if (targetPrefix === "AnyScaleScalingPlannerFrontendService") {
      service = "autoscaling-plans";
    }
  } else if (region == null && service.startsWith("s3-")) {
    region = service.slice(3).replace(/^fips-|^external-1/, "");
    service = "s3";
  } else if (service.endsWith("-fips")) {
    service = service.slice(0, -5);
  } else if (region && /-\d$/.test(service) && !/-\d$/.test(region)) {
    [service, region] = [region, service];
  }
  return [HOST_SERVICES[service] || service, region || ""];
}
__name(guessServiceRegion, "guessServiceRegion");
__name2(guessServiceRegion, "guessServiceRegion");
var asArray = /* @__PURE__ */ __name2((v) => Array.isArray(v) ? v : [v], "asArray");
var clean = /* @__PURE__ */ __name2((v) => (v ?? "").replace(/\s+/g, ""), "clean");
async function sendEmail(env, msg) {
  const region = clean(env.AWS_REGION);
  const client = new AwsClient({
    accessKeyId: clean(env.AWS_ACCESS_KEY_ID),
    secretAccessKey: clean(env.AWS_SECRET_ACCESS_KEY),
    service: "ses",
    region,
    retries: 0
  });
  const endpoint = `https://email.${region}.amazonaws.com/v2/email/outbound-emails`;
  const body = {
    FromEmailAddress: env.SES_FROM,
    Destination: { ToAddresses: asArray(msg.to) },
    ...msg.replyTo ? { ReplyToAddresses: asArray(msg.replyTo) } : {},
    Content: {
      Simple: {
        Subject: { Data: msg.subject, Charset: "UTF-8" },
        Body: {
          Text: { Data: msg.text, Charset: "UTF-8" },
          ...msg.html ? { Html: { Data: msg.html, Charset: "UTF-8" } } : {}
        }
      }
    }
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8e3);
  let res;
  try {
    res = await client.fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`SES send failed (${res.status}): ${detail}`);
  }
}
__name(sendEmail, "sendEmail");
__name2(sendEmail, "sendEmail");
var STAGES = /* @__PURE__ */ new Set(["inside", "just_left", "building", "traction"]);
var onRequestPost = /* @__PURE__ */ __name2(async (context) => {
  try {
    return await handleAdvisoryPost(context);
  } catch (err) {
    console.error("advisory: unhandled", err);
    return json({ ok: false, error: "Unexpected server error. Please try again later." }, 500);
  }
}, "onRequestPost");
var handleAdvisoryPost = /* @__PURE__ */ __name2(async ({ request, env }) => {
  const data = await readBody(request);
  if (data.company) return json({ ok: true });
  const name = data.name ?? "";
  const email = (data.email ?? "").toLowerCase();
  const stage = data.stage ?? "";
  const message = data.message ?? "";
  const link = normalizeUrl(data.link ?? "");
  const errors = {};
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!stage || !STAGES.has(stage)) errors.stage = "Please choose what best describes you.";
  if (!message) errors.message = "Please tell us what you want to be different.";
  if (link && !isValidWebUrl(link)) errors.link = "That does not look like a web address.";
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 400);
  }
  if (!env.DB) {
    console.error("advisory: DB binding missing");
    return json({ ok: false, error: "Server misconfigured (database). Please try again later." }, 500);
  }
  try {
    await env.DB.prepare(
      `INSERT INTO advisory_requests (name, email, stage, message, link)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(name, email, stage, message, link || null).run();
  } catch (err) {
    console.error("advisory: D1 insert failed", err);
    return json({ ok: false, error: "Could not save your request. Please try again later." }, 500);
  }
  if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY || !env.AWS_REGION || !env.SES_FROM || !env.CONTACT_TO) {
    console.error("advisory: email env missing");
    return json(
      { ok: false, error: "We saved your request but email is not configured yet. We will still see it." },
      502
    );
  }
  try {
    await sendEmail(env, {
      to: env.CONTACT_TO,
      replyTo: email,
      subject: `New advisory request from ${name}`,
      text: `Name: ${name}
Email: ${email}
Stage: ${stage}
Link: ${link || "(none)"}

Message:
${message}`,
      html: `<h2>New advisory request</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}<br />
<strong>Email:</strong> ${escapeHtml(email)}<br />
<strong>Stage:</strong> ${escapeHtml(stage)}<br />
<strong>Link:</strong> ${link ? `<a href="${escapeHtml(link)}">${escapeHtml(link)}</a>` : "(none)"}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`
    });
  } catch (err) {
    console.error("advisory: SES alert failed", err);
    return json(
      { ok: false, error: "We saved your request but the notification failed. We will still see it." },
      502
    );
  }
  try {
    await sendEmail(env, {
      to: email,
      subject: "Thanks for reaching out to Freedom with AI",
      text: `Hi ${name},

Thanks for reaching out. We read every message and reply if it is a fit.

Sonia & Cammie, Freedom with AI`,
      html: `<p>Hi ${escapeHtml(name)},</p>
<p>Thanks for reaching out. We read every message and reply if it is a fit.</p>
<p>Sonia &amp; Cammie, Freedom with AI</p>`
    });
  } catch {
  }
  return json({ ok: true, message: "Thanks for reaching out. We read every message and reply if it is a fit." });
}, "handleAdvisoryPost");
var TOPICS = /* @__PURE__ */ new Set(["general", "speaking", "events", "partnership"]);
var TOPIC_LABELS = {
  general: "General question",
  speaking: "Speaking or podcast invitation",
  events: "Events",
  partnership: "Partnership or collaboration"
};
var onRequestPost2 = /* @__PURE__ */ __name2(async (context) => {
  try {
    return await handleContactPost(context);
  } catch (err) {
    console.error("contact: unhandled", err);
    return json({ ok: false, error: "Unexpected server error. Please try again later." }, 500);
  }
}, "onRequestPost");
var handleContactPost = /* @__PURE__ */ __name2(async ({ request, env }) => {
  const data = await readBody(request);
  if (data.company) return json({ ok: true });
  const name = data.name ?? "";
  const email = (data.email ?? "").toLowerCase();
  const topic = data.topic || "general";
  const message = data.message ?? "";
  const errors = {};
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!TOPICS.has(topic)) errors.topic = "Please choose a topic.";
  if (!message) errors.message = "Please enter a message.";
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 400);
  }
  if (!env.DB) {
    console.error("contact: DB binding missing");
    return json({ ok: false, error: "Server misconfigured (database). Please try again later." }, 500);
  }
  try {
    await env.DB.prepare(
      `INSERT INTO contact_messages (name, email, topic, message)
       VALUES (?, ?, ?, ?)`
    ).bind(name, email, topic, message).run();
  } catch (err) {
    console.error("contact: D1 insert failed", err);
    return json({ ok: false, error: "Could not send your message. Please try again later." }, 500);
  }
  if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY || !env.AWS_REGION || !env.SES_FROM || !env.CONTACT_TO) {
    console.error("contact: email env missing");
    return json(
      { ok: false, error: "We saved your message but email is not configured yet. We will still see it." },
      502
    );
  }
  const topicLabel = TOPIC_LABELS[topic] ?? topic;
  try {
    await sendEmail(env, {
      to: env.CONTACT_TO,
      replyTo: email,
      subject: `New ${topicLabel} message from ${name}`,
      text: `Name: ${name}
Email: ${email}
Topic: ${topicLabel}

Message:
${message}`,
      html: `<h2>New contact message</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}<br />
<strong>Email:</strong> ${escapeHtml(email)}<br />
<strong>Topic:</strong> ${escapeHtml(topicLabel)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`
    });
  } catch (err) {
    console.error("contact: SES alert failed", err);
    return json(
      { ok: false, error: "We saved your message but the notification failed. We will still see it." },
      502
    );
  }
  try {
    await sendEmail(env, {
      to: email,
      subject: "Thanks for reaching out to Freedom with AI",
      text: `Hi ${name},

Thanks for your message. We read everything and will get back to you soon.

\u2014 Freedom with AI`,
      html: `<p>Hi ${escapeHtml(name)},</p>
<p>Thanks for your message. We read everything and will get back to you soon.</p>
<p>&mdash; Freedom with AI</p>`
    });
  } catch {
  }
  return json({ ok: true, message: "Thanks for your message. We will get back to you soon." });
}, "handleContactPost");
var onRequestGet = /* @__PURE__ */ __name2(async ({ env }) => {
  let d1Ok = false;
  if (env.DB) {
    try {
      await env.DB.prepare("SELECT 1 AS ok").first();
      d1Ok = true;
    } catch (err) {
      console.error("health: D1 query failed", err);
    }
  }
  return json({
    db: Boolean(env.DB),
    d1Ok,
    awsKey: Boolean(env.AWS_ACCESS_KEY_ID),
    awsSecret: Boolean(env.AWS_SECRET_ACCESS_KEY),
    region: env.AWS_REGION ?? null,
    from: env.SES_FROM ?? null,
    to: env.CONTACT_TO ?? null,
    siteUrl: env.SITE_URL ?? null
  });
}, "onRequestGet");
var SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
var DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
var MAX_GOAL = 2e3;
var prettyDate = /* @__PURE__ */ __name2((iso) => {
  if (!iso) return "date to be confirmed";
  const parsed = /* @__PURE__ */ new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(parsed);
}, "prettyDate");
var onRequestPost3 = /* @__PURE__ */ __name2(async (context) => {
  try {
    return await handleOfficeHoursPost(context);
  } catch (err) {
    console.error("office-hours: unhandled", err);
    return json({ ok: false, error: "Unexpected server error. Please try again later." }, 500);
  }
}, "onRequestPost");
var handleOfficeHoursPost = /* @__PURE__ */ __name2(async ({ request, env }) => {
  const data = await readBody(request);
  if (data.company) return json({ ok: true });
  const eventSlug = (data.event ?? "").toLowerCase();
  const sessionDate = data.sessionDate ?? "";
  const name = data.name ?? "";
  const email = (data.email ?? "").toLowerCase();
  const goal = (data.goal ?? "").slice(0, MAX_GOAL);
  const link = normalizeUrl(data.link ?? "");
  const source = (data.source ?? "direct").slice(0, 64);
  const errors = {};
  if (!eventSlug || !SLUG_PATTERN.test(eventSlug)) errors.event = "Please choose which session.";
  if (sessionDate && !DATE_PATTERN.test(sessionDate)) errors.sessionDate = "Please choose a date.";
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!goal) errors.goal = "Tell us what you want to walk out with.";
  if (link && !isValidWebUrl(link)) errors.link = "That does not look like a web address.";
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 400);
  }
  if (!env.DB) {
    console.error("office-hours: DB binding missing");
    return json({ ok: false, error: "Server misconfigured (database). Please try again later." }, 500);
  }
  try {
    await env.DB.prepare(
      `INSERT INTO office_hours_signups (name, email, event_slug, session_date, goal, link, source)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(event_slug, session_date, email) DO UPDATE SET
         name = excluded.name,
         goal = excluded.goal,
         link = excluded.link,
         source = excluded.source`
    ).bind(name, email, eventSlug, sessionDate, goal, link || null, source).run();
  } catch (err) {
    console.error("office-hours: D1 insert failed", err);
    return json({ ok: false, error: "Could not save your signup. Please try again later." }, 500);
  }
  if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY || !env.AWS_REGION || !env.SES_FROM || !env.CONTACT_TO) {
    console.error("office-hours: email env missing");
    return json(
      { ok: false, error: "We saved your signup but email is not configured yet. We will still see it." },
      502
    );
  }
  const when = prettyDate(sessionDate);
  try {
    await sendEmail(env, {
      to: env.CONTACT_TO,
      replyTo: email,
      subject: `Office hours (${eventSlug}, ${sessionDate || "TBC"}): ${name}`,
      text: `Event: ${eventSlug}
Date: ${sessionDate || "(not published yet)"}
Name: ${name}
Email: ${email}
Source: ${source}
Link: ${link || "(none)"}

Wants to walk out with:
${goal}`,
      html: `<h2>Office hours signup</h2>
<p><strong>Event:</strong> ${escapeHtml(eventSlug)}<br />
<strong>Date:</strong> ${escapeHtml(sessionDate || "(not published yet)")}<br />
<strong>Name:</strong> ${escapeHtml(name)}<br />
<strong>Email:</strong> ${escapeHtml(email)}<br />
<strong>Source:</strong> ${escapeHtml(source)}<br />
<strong>Link:</strong> ${link ? `<a href="${escapeHtml(link)}">${escapeHtml(link)}</a>` : "(none)"}</p>
<p><strong>Wants to walk out with:</strong></p>
<p>${escapeHtml(goal).replace(/\n/g, "<br />")}</p>`
    });
  } catch (err) {
    console.error("office-hours: SES alert failed", err);
    return json(
      { ok: false, error: "We saved your signup but the notification failed. We will still see it." },
      502
    );
  }
  const dateLine = sessionDate ? `You are signed up for ${when}.` : "You are on the list. We will email you as soon as the next date is set.";
  try {
    await sendEmail(env, {
      to: email,
      subject: "You are on the list for office hours",
      text: `Hi ${name},

${dateLine} Free, 15 to 20 minutes, one to one.

Two things that make the time worth a lot more:

1. Reply to this email with the one question you actually want answered.
2. Bring a link to what you are building, even if it is rough.

We run these during the networking time, so come find us and we will get to you.
Room and timing are on https://freedomwith.ai/office-hours if you need them on the day.

Sonia & Cammie, Freedom with AI`,
      html: `<p>Hi ${escapeHtml(name)},</p>
<p>${escapeHtml(dateLine)} Free, 15 to 20 minutes, one to one.</p>
<p>Two things that make the time worth a lot more:</p>
<ol>
<li>Reply to this email with the one question you actually want answered.</li>
<li>Bring a link to what you are building, even if it is rough.</li>
</ol>
<p>We run these during the networking time, so come find us and we will get to you. Room and timing are on
<a href="https://freedomwith.ai/office-hours">freedomwith.ai/office-hours</a> if you need them on the day.</p>
<p>Sonia &amp; Cammie, Freedom with AI</p>`
    });
  } catch {
  }
  return json({ ok: true, message: "You are in. Check your email for the confirmation." });
}, "handleOfficeHoursPost");
var DONE = { ok: true, message: "You're on the list. Thanks for subscribing!" };
var onRequestPost4 = /* @__PURE__ */ __name2(async ({ request, env }) => {
  const data = await readBody(request);
  const email = (data.email ?? "").toLowerCase();
  const source = data.source || "site";
  if (data.company) return json({ ok: true });
  if (!isValidEmail(email)) {
    return json({ ok: false, error: "Enter a valid email address." }, 400);
  }
  if (!env.DB) {
    console.error("subscribe: DB binding missing");
    return json({ ok: false, error: "Server misconfigured (database). Please try again later." }, 500);
  }
  try {
    const existing = await env.DB.prepare("SELECT status FROM subscribers WHERE email = ?").bind(email).first();
    if (existing && existing.status === "confirmed") {
      return json({ ok: true, message: "You're already on the list." });
    }
    if (existing) {
      await env.DB.prepare(
        `UPDATE subscribers
           SET status = 'confirmed', confirmed_at = datetime('now'),
               unsubscribe_token = ?, source = ?, unsubscribed_at = NULL
         WHERE email = ?`
      ).bind(newToken(), source, email).run();
    } else {
      await env.DB.prepare(
        `INSERT INTO subscribers (email, status, source, unsubscribe_token, confirmed_at)
         VALUES (?, 'confirmed', ?, ?, datetime('now'))`
      ).bind(email, source, newToken()).run();
    }
  } catch (err) {
    console.error("subscribe: D1 write failed", err);
    return json({ ok: false, error: "Could not add you right now. Please try again later." }, 500);
  }
  return json(DONE);
}, "onRequestPost");
var onRequestGet2 = /* @__PURE__ */ __name2(async ({ request, env }) => {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!token) {
    return html(
      statusPage(env.SITE_URL, "Invalid link", "This unsubscribe link is missing its token."),
      400
    );
  }
  const row = await env.DB.prepare(
    "SELECT id FROM subscribers WHERE unsubscribe_token = ?"
  ).bind(token).first();
  if (!row) {
    return html(
      statusPage(env.SITE_URL, "Link not found", "This unsubscribe link is invalid or has expired."),
      404
    );
  }
  await env.DB.prepare(
    `UPDATE subscribers
       SET status = 'unsubscribed', unsubscribed_at = datetime('now')
     WHERE id = ?`
  ).bind(row.id).run();
  return html(
    statusPage(
      env.SITE_URL,
      "Unsubscribed",
      "You have been removed from the list. You can resubscribe anytime from the site."
    )
  );
}, "onRequestGet");
var routes = [
  {
    routePath: "/api/advisory",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/contact",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/health",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/office-hours",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/subscribe",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/unsubscribe",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  }
];
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-8hbnNO/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-8hbnNO/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
/*! Bundled license information:

aws4fetch/dist/aws4fetch.esm.mjs:
  (**
   * @license MIT <https://opensource.org/licenses/MIT>
   * @copyright Michael Hart 2024
   *)
*/
//# sourceMappingURL=functionsWorker-0.5422269686692696.js.map
