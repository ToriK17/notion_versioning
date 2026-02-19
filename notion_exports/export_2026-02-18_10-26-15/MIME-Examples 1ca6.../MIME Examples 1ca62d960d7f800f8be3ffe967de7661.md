# MIME Examples

**Is it only for email?** No — MIME types are now used **everywhere**, especially in:

- **HTTP headers** (`Content-Type: application/json`)
- **File uploads**
- **APIs**

So if you’ve ever seen `.jpg` = `image/jpeg` or `.pdf` = `application/pdf` in a browser — that’s a MIME type. For example you can see it in the response headers.
Where the **Content-Type** is an HTTP header and the value of **Content-Type** is a **MIME type**.

### Common MIME Types You Might See

| File Type | MIME Type |
| --- | --- |
| HTML | `text/html` |
| CSS | `text/css` |
| JavaScript | `application/javascript` |
| JPEG Image | `image/jpeg` |
| PNG Image | `image/png` |
| PDF | `application/pdf` |
| JSON | `application/json` |
| ZIP File | `application/zip` |

Sometimes you can debug a MIME issue because chrome will sometimes show the MIME type in tooltips or when it fails to load due to a mismatch

### You can also see MIME types when you download something

If you download a file like a `.pdf` or `.jpg`, the server includes a `Content-Type` header so your browser knows:

- Open it in-browser?
- Save it to disk?
- Preview it?

The file’s **MIME type** is what tells your browser **how to treat it**.