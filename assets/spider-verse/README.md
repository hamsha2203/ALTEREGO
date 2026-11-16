# Spider-Verse artwork assets

The app looks for one distinct local image per identity. Add the files below to
this folder to enable character artwork in the reveal and collectible card. Once
an image is in place, add its exact filename to the `available` array in
`artwork.json`. The app only requests images listed there, so missing artwork
does not create broken image requests.

- `miles-morales.png`
- `gwen-stacy.png`
- `hobie-brown.png`
- `peter-b-parker.png`
- `miguel-ohara.png`
- `spider-man-noir.png`
- `peni-parker.png`
- `spider-ham.png`

Use transparent-background PNG renders where possible, with consistent
portrait proportions and enough resolution for a large result-page display.
Only add artwork that you have permission to distribute, such as commissioned
or original illustrations, or artwork with a license that permits reuse. Do not
copy film promotional images or other copyrighted artwork without permission.

Until an identity's file is added, the app clearly names the missing filename
on that result instead of displaying a broken image or an unrelated substitute.
