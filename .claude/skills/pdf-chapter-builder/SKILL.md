# PDF Chapter Builder

name: pdf-chapter-builder
description: Convert e-book chapters from Markdown to PDF with embedded illustrations. Use when user wants to generate PDFs of individual chapters or all chapters for reading/editing. Invoke when user mentions "build PDF", "convert to PDF", "chapter PDF", or wants to read/review chapters as PDFs.

---

## Purpose

This skill converts Markdown chapter files to PDF format using Pandoc and XeLaTeX, ensuring all illustrations are properly embedded and Unicode characters (including emojis) are supported.

## Prerequisites

- Pandoc 3.x or later installed
- MiKTeX (Windows) or TeX Live (Mac/Linux) installed
- Both must be in system PATH

## Commands

### Convert a Single Chapter

From the project root directory:

```bash
cd "E:\Vibe Coding\VibeCoded-Ebook" && pandoc chapters/ch01-the-interloquial-revolution.md -o build/ch01.pdf --pdf-engine=xelatex --resource-path=chapters -H epub-build/table-style.tex
```

Replace `ch01-the-interloquial-revolution.md` and `ch01.pdf` with the appropriate chapter.

**Note:** The `-H epub-build/table-style.tex` flag includes custom LaTeX styling for professional table formatting with visible borders and proper spacing.

### Convert All Chapters

Run the build script:

```powershell
powershell -ExecutionPolicy Bypass -File "E:\Vibe Coding\VibeCoded-Ebook\build-pdfs.ps1"
```

Or run this PowerShell script directly:

```powershell
$projectRoot = "E:\Vibe Coding\VibeCoded-Ebook"
$chapters = @(
    @{src="ch01-the-interloquial-revolution.md"; out="ch01.pdf"},
    @{src="ch02-interloquial-skills.md"; out="ch02.pdf"},
    @{src="ch03-lets-get-vibe-coding.md"; out="ch03.pdf"},
    @{src="ch04-understanding-ai-partners.md"; out="ch04.pdf"},
    @{src="ch05-git-version-control.md"; out="ch05.pdf"},
    @{src="ch06-first-vibe-coded-project.md"; out="ch06.pdf"},
    @{src="ch07-building-with-python.md"; out="ch07.pdf"},
    @{src="ch08-web-development.md"; out="ch08.pdf"},
    @{src="ch09-infrastructure-deployment.md"; out="ch09.pdf"},
    @{src="ch10-full-stack-integration.md"; out="ch10.pdf"},
    @{src="ch11-from-idea-to-income.md"; out="ch11.pdf"},
    @{src="ch12-advanced-vibe-coding-techniques.md"; out="ch12.pdf"},
    @{src="ch13-building-your-practice.md"; out="ch13.pdf"},
    @{src="ch14-the-future-of-interloquial-practice.md"; out="ch14.pdf"}
)

Set-Location $projectRoot

foreach ($ch in $chapters) {
    $srcPath = "chapters/$($ch.src)"
    $outPath = "build/$($ch.out)"

    if (Test-Path $srcPath) {
        Write-Host "Converting $($ch.src)..." -ForegroundColor Cyan
        # Use xelatex for better Unicode support (handles emojis)
        pandoc $srcPath -o $outPath --pdf-engine=xelatex --resource-path=chapters -H epub-build/table-style.tex 2>&1 | Out-Null

        if (Test-Path $outPath) {
            $size = (Get-Item $outPath).Length / 1KB
            Write-Host "  Created: $($ch.out) ($([math]::Round($size, 1)) KB)" -ForegroundColor Green
        } else {
            Write-Host "  FAILED: $($ch.out)" -ForegroundColor Red
        }
    } else {
        Write-Host "Skipping $($ch.src) - file not found" -ForegroundColor Yellow
    }
}

Write-Host "`nDone! PDFs are in the build/ folder." -ForegroundColor Green
```

### Key Parameters

| Parameter | Purpose |
|-----------|---------|
| `--pdf-engine=xelatex` | Uses XeLaTeX for Unicode support (emojis, special characters) |
| `--resource-path=chapters` | Tells Pandoc where to find images (relative paths in markdown resolve from here) |
| `-H epub-build/table-style.tex` | Includes custom LaTeX for professional table formatting with borders |

### Output Location

All PDFs are generated in the `build/` folder, which is gitignored.

## Troubleshooting

### Images Not Appearing
- Ensure `--resource-path=chapters` is included
- Verify image files exist at the paths referenced in the markdown

### Unicode/Emoji Errors
- Use `--pdf-engine=xelatex` instead of `pdflatex`
- Some emojis may show as blank if no suitable font is installed

### MiKTeX Update Warning
Run MiKTeX Console and check for updates to suppress the warning.

### Missing LaTeX Packages
MiKTeX will auto-download missing packages if "Install missing packages on-the-fly" was set to Yes during installation.

## Example Usage

**User:** "Build PDFs for all chapters"

**Action:**
```powershell
powershell -ExecutionPolicy Bypass -File "E:\Vibe Coding\VibeCoded-Ebook\build-pdfs.ps1"
```

**User:** "Convert chapter 7 to PDF"

**Action:**
```bash
cd "E:\Vibe Coding\VibeCoded-Ebook" && pandoc chapters/ch07-building-with-python.md -o build/ch07.pdf --pdf-engine=xelatex --resource-path=chapters -H epub-build/table-style.tex
```
