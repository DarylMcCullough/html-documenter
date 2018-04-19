# HTML Documenter Overview

**Html documenter** is a suite of tools to help a technical writer to create stand-alone html files that can serve as documentation for a complex system, such as a building, a country, a software system, or anything that has interconnected parts. The reason for wanting stand-alone html is a personal preference---it's nice to be able to pass around the documentation, without requiring a web site. This is especially nice in an organization that has controlled access to web sites, with firewalls and other security and privacy safeguards.

#### Image Map Helper

The first tool implemented for the _Html Documenter_ suite is **Image Map Helper**. _Image Map Helper_ is a tool to help create _image maps_.  This is a technique whereby a picture of a large complex system is used as an index into the documentation. Clicking on a part of the picture will take the user to a web page about that part. So for example, a complex system might have a system diagram with boxes representing components. A building might have boxes representing individual rooms or sections of the building. The tedious part of setting up an image map is specifying which regions of the picture correspond to which parts.

_Image map helper_ helps in this by using Javascript to allow the user to specify a region using mouse clicks. Then the tedious parts of setting up image maps, the CSS and HTML, are generated automatically.

##### Concepts used in Image Map Helper

_Image Map Helper_ uses a number of concepts in implementing its functionality:

1. _Image maps_: The concept of using a picture as a visual index, or a visual table of contents, for organizing information about a complex system.
2. _Code generation_: _Image Map Helper_ saves the user a lot of tedious work by generating the CSS and HTML needed to make image maps work.
3. _CSS_: CSS is used to style the html GUI. It is used to position the various regions within the image, and also to style the forms and the explanatory hover text.
4. _Javascript_: Javascript is the programming language used to do the action of building an image. The choice of Javascript was simply because every web browser automatically comes with a Javascript interpreter. So it's a universal language for HTML. This is important for my goal of requiring the minimal setup to use the system. It only assumes ordinary web browsers, and not a server environment running Ruby, python, Php, etc.
5. _HTML_: I chose to make system documentation in HTML because, again, everyone has access to a web browser, and so using HTML doesn't require installation of any new programs or viewers. Also, HTML allows pretty sophisticated user interaction with no additional software.
6. _Overlays_: (also: "CSS Absolute positioning") The way that I implemented image maps was slightly different from the image maps that CSS supports most directly. My approach involves using CSS' ability to place html elements on top of each other. That's what an overlay is. Each region is an initially transparent overlay covering a part of the image. When the user hovers over that region, special code is activated.
7. _CSS Opacity_: In my approach to image maps, each region is invisible, initially, so that the user sees the whole picture. But when a user's mouse hovers over a region, the region becomes visible (translucent) so that the user knows that it's a clickable region. This manipulation of visibility uses CSS opacity attribute.
8. _Dynamic resizing_: When the image map is initially create, the sizes and positions of the regions are only known relative to the image. Javascript code is used to dynamically recompute positions and sizes of regions to account for window resizing.
9. _Hovertext (or "tooltips")_: When a user's mouse passes over, or "hovers" over a region, a text message appears to tell the user something about the region, so that he or she will know whether he wants to click on it to get more information.
10. _Form processing using javascript_: In creating the image map, _Image Map Helper_ gathers information from the user about the name of the region, a short description to be used as hover text, and the url that clicking on the region will send the user to. This information is gathered by using HTML forms. In a server-based application, forms are processed by the server, but in this client-based application, the processing is done by javascript code.


## IMAGE MAP HELPER: The Code
There are two parts to _Image Map Helper_, which are both written in Javascript.

### map_helper.js

This is javascript code for setting an image map. The way that it works is that you create an HTML page with your 
image in it, by replacing the URL in a provided template ("helper-template.html"). Replace "../images/<image-name>.jpg" by 
the path to your image. Replace "<image-title>" by the title of your image. Replace "<alt-text>" by the alt text
for your image. You can also replace the width argument. You also may need to adjust the paths to the css files and javascript files.

After setting up the helper file, open it in a browser (currently, it's only been tested in Chrome and Internet
Explorer; it may not work in Firefox or Safari). To specify a part or region, click the mouse on the upper left-hand corner
of the region (currently, only rectangular regions are supported.) Then click again on the lower right-hand corner of
the region. A transparent red region will appear showing the region selected. Also, a form will pop up that will
allow you to specify the following attributes for your part or region:

1. The id for the part or region.
2. A URL for a page with more information about that part or region.
3. Hovertext, which is typically a one-sentence blurb about the region that will appear when your mouse hovers over the region.

**Mark a region using the mouse pointer**
![Mark a region using the mouse pointer](images/snapshot-2.jpg)
The region turns reddish to indicate the region marked. Fill in the details for the region, including ID, url and hovertext.

**After marking all the regions, click "Show Coords" to generate CSS.**
![Click  show coords](images/snapshot-3.jpg)

**The generated CSS is shown in a text area**
![Generated CSS](images/snapshot-4.jpg)

**Click "Show divs" to generate HTML.**
![Click show divs](images/snapshot-5.jpg)

**The generated HTML is shown in a text area**
![Generated HTML](images/snapshot-6.jpg)

After giving information about all the regions in your image map, you are ready to generate the code. There are
two pieces of code that are generated:

#### CSS that gives the coordinates for each part or region.
To see this CSS, click on the button called "Show Coords". The generated css wil appear in a text region.
Copy this css and place into a file called something like "<image-name>.css". Place it into the css directory.

#### HTML that creates divs for each region.
To see this HTML. click on the button called "Show Divs". The html will appear in a text region. Copy this and
put it into the html file for your image (created using the template image-map-template.html). Place the html
directly underneath the "img" element, inside the parent div (called "parent").

### image_map.js

This is javascript code that implements the image map. 

Create your image map file by copying and modifying "image-map-template.html". Perform the same replacements as
for customizing "helper-template.html". Then add the html generated by the map helper.

Afterwards, if you load the image map in a browser, then when you hover over a part or region, the hover text appears,
and the region is highlighted. Clicking on the region will open the html file giving more information about that region.

**Hovering over a marked region makes the region turn greenish**

![Hover over marked region](images/snapshot-7.jpg)
Hovertext is displayed, and clicking on the region will take you to the web page specified by the URL given previously.
 
Sample examples of the helper file, image map and css files are included in the html directory. They are called:
asde-x-overview.html, asde-x-overview_helper.html and asdex-processing (in the css directory).

# INSTALLATION AND CONFIGURATION

To create a new html documentation project

1. Copy the directory "project-template" and rename it to the name of your project.
2. For each image that you would like to turn into an image-map, place the image
file (for example, "my-image.jpg") into the "images" directory.
3. For each image, copy and rename "helper-template.html" and "image-map-template.html"
and place into the "html" directory.
4. Modify the template files as described above, to replace the placeholders 
"<image-name>.jpg", "<image-title>", and "<alt-text>" to match the name and title
of your image.
5. Now you are ready to create your image map.

## A Sample Project
A sample project is found in the directory called "sample project". Open "asde-x-overview_helper.1.html"
to see the tool for creating an image map at work. Open "asde-x-overview.html" to
see the completed image map in action.

## Dependencies
Currently, the only browser that has been thoroughly tested is Chrome. Javascript
must be enabled.

#