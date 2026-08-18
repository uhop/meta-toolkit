# Security Policy

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues, pull requests, or discussions.**

Report privately through GitHub's **[Private Vulnerability Reporting](https://github.com/uhop/meta-toolkit/security/advisories/new)**
(the "Report a vulnerability" button under the repository's **Security** tab). This opens a
confidential advisory visible only to the maintainers and you.

If GitHub reporting is unavailable to you, email the maintainer at
**eugene.lazutkin@gmail.com** with `SECURITY` in the subject line. Please do not disclose
details publicly until a fix is released.

When reporting, please include:

- the affected version(s) and platform,
- a description of the issue and its impact,
- steps to reproduce or a proof of concept (a link to a private/secret gist is fine),
- any suggested remediation.

## Scope

`meta-toolkit` is a zero-dependency toolkit for meta programming: name-casing conversions,
property descriptors, aliases, prototype traversal, iterators, deep path access, option merging,
and comparator adapters. It performs no I/O, opens no network connections, spawns no processes,
and parses no untrusted input formats. It has no user-facing surface of its own — every function
is called by application code that supplies its own arguments.

In scope is any way to make a documented API perform an operation its caller did not ask for —
for example, a helper that derives a property key from _data_ rather than from its arguments, or
a function that writes outside the target it was given.

## Out of scope: caller-supplied property paths

The deep-path helpers in `path.js` — `get()`, `set()`, `forceSet()`, and `remove()` — walk
caller-supplied keys without sanitizing the magic property names `__proto__`, `constructor`, and
`prototype`. This is documented in the [README](./README.md) and in [AGENTS.md](./AGENTS.md), and
it is intentional.

**Reports that consist of passing `__proto__` or `constructor.prototype` to these functions are
not accepted as vulnerabilities.** Three reasons:

1. **No privilege is granted.** `set(target, path, value)` gives a caller nothing it does not
   already have. Code that can call it can equally write `Object.prototype.xyz = 1` on the line
   above. These helpers are not a boundary between untrusted input and a privileged operation —
   the caller chooses the path, and a caller who chooses `__proto__` has chosen to modify a
   prototype.

2. **Modifying prototypes is the point.** This is a meta-programming toolkit. Prototype traversal
   and augmentation are supported, documented operations with a module (`prototypes.js`) and an
   API family (`addProto*`) of their own. A path walker that refuses `__proto__`, `constructor`,
   and `prototype` refuses legitimate use: such a guard was written and reverted before release
   because it rejected paths like `set(obj, 'constructor.name', 'Foo')`.

3. **No key is ever taken from untrusted data.** The package contains no recursive merge over a
   source object's keys — the classic prototype-pollution sink. `copyOptions()` iterates the keys
   of the caller's own `defaults` and consults a source only for keys already on that whitelist.
   Every property write in the package derives its key from an argument the caller passed, never
   from data being processed.

The trust boundary is the application. If you pass externally-sourced paths — from an HTTP request
body, a query string, a config file — to `get`, `set`, `forceSet`, or `remove`, validate them at
your own boundary first. The library does not, by design.

## Supported versions

Fixes are released against the latest published version. Please upgrade to the latest
`meta-toolkit` release before reporting, and pin the fixed version once one is available.

## Disclosure process

- We aim to acknowledge a report within a few business days.
- We work to a coordinated-disclosure timeline (up to 90 days by default) and will keep you
  updated on progress toward a fix.
- With your permission, we credit reporters in the release notes and advisory. We are happy to
  coordinate a CVE through GitHub's CNA once a fix is validated.

Thank you for helping keep the ecosystem safe.
