# Pan TINT

## Pan calling TINT API to display a new theme.

This SPA makes a call to TINT's API to grab a the feed from ironpan TINT. ironpan is connected to Pan's Facebook and Pinterest feeds.
The bee hive display design is meant for large screen display like TV or projector. Each tile focuses on the image and the comments.
Each tile has a fixed size of about 300px wide. Resizing the screen will increase/decrease the number of tiles to the right.

Known issues
- The images that are not centered will look off the edge, and important info of the image may not be captured. For example, you can see those images where a person head is totally out of frame because it's on the bottom edge of the portrait picture.
- It doesn't fully responsive. In smaller screen the arrangement of the tiles might look off. In some certain width, there are too much white space on the right.
- The infinity scroll doesn't work beautifully on window resize. It sometimes keep loading the whole page.
- Has not implemented all the icons, only 1 (Facebook) - 5 (Pinterest)
- Only log error for now. We should display user relevant error to the user, and non-relevant to Rollbar.