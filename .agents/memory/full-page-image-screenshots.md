---
name: Full-page image screenshots
description: Diagnosing missing images in full-page screenshots of long local galleries.
---

In a long gallery, a full-page browser capture can show some image frames as blank even when their local files are valid and every image URL returns successfully. Changing the gallery to eagerly load every photo did not eliminate this in the storefront preview.

**Why:** The supplied JPEGs decoded correctly and their proxied URLs returned HTTP 200, while some images still appeared absent in the full-page screenshot.

**How to apply:** Check the initial viewport and verify source files/URLs before editing image mappings. Keep sensible lazy loading for below-the-fold photos unless an actual in-browser scroll shows a loading failure.
