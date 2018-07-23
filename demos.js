add_clearfix = function() {
  page.append('<div class="clear"></div>');
}

show_demo_index = function(){
  page.append(h1('iio Engine App Demos'));
  page.append('<h3>click any app to view the source code</h3>');
  var iioApps = document.createElement('div');
  iioApps.className = 'iioapps';
  page.append(iioApps);
  add_demo_preview( iioApps, ScrollShooter, "ScrollShooter" );
  add_demo_preview( iioApps, Snake, "Snake" );
  add_demo_preview( iioApps, Box2dDemo, "Box2d" );
  add_demo_preview( iioApps, Platformer, "Platformer" );
  add_demo_preview( iioApps, MineSweeper, "MineSweeper", { color: new iio.Color(255,255,255) } );
  add_demo_preview( iioApps, BezierCurves, "BezierCurves" );
  add_demo_preview( iioApps, DragDrop, "DragDrop" );
  add_demo_preview( iioApps, TextEdit, "TextEdit" );
  add_demo_preview( iioApps, Panning, "Panning" );
  add_demo_preview( iioApps, ColorLines, "ColorLines", { lineWidth:20 } );
  add_demo_preview( iioApps, ConwaysGameOfLife, "ConwaysGameOfLife", {
    glider: true,
    maxCellsInRow: 5,
    preview: true
  } );
  add_demo_preview( iioApps, Snow, "Snow" );
  page.append(clear);

  page.append('<span id="demos.Collisions"></span>');
  show_unit_test(page, iio.test.Collisions, 'Collisions', 0);
  page.append('<span id="demos.Line"></span>');
  show_unit_test(page, iio.test.Line, 'Line', 1);
  page.append('<span id="demos.Quad"></span>');
  show_unit_test(page, iio.test.Quad, 'Quad', 2);
  page.append('<span id="demos.Grid"></span>');
  show_unit_test(page, iio.test.Grid, 'Grid', 3);
  page.append('<span id="demos.Ellipse"></span>');
  show_unit_test(page, iio.test.Ellipse, 'Ellipse', 4);
  page.append('<span id="demos.Polygon"></span>');
  show_unit_test(page, iio.test.Polygon, 'Polygon', 5);
  page.append('<span id="demos.Text"></span>');
  show_unit_test(page, iio.test.Text, 'Text', 6);
}

add_demo_preview = function( elem, app, title, settings ){
  var href = '#demos/'+title.toLowerCase();
  create_demo_canvas( elem, 200, title, href )
  $('#'+title).click(function(){
    goTo(href);
    return false;
  });
  if(settings)
    iio.start([ app, iio.merge( { preview:true }, settings ) ], title );
  else 
    iio.start([ app, { preview:true } ], title );
}

show_demo = function( app, title, settings){
  $('#bg_glow').remove();
  $('#column').hide();
  $('#header').css({ 'left': 0, 'margin-left': 0 });
  $('#footer').css({ 'left': 0, 'margin-left': 0 });
  $('#header').append('<div id="fullscreen_header"><a id="back" href="">&lt; Back</a> | <h1>'+title+'</h1> | <a id="source" href="">Source Code</a> </div>');
  $('#back').click(function(){
    window.history.back()
  });
  $('#source').click(function(e){
    codeWindow = window.open("demos/source-code/"+title+".html", "littleWindow", "location=no,menubar=no,toolbar=no,width=700,height=800,left=0"); 
    codeWindow.moveTo(0,0);
    return false;
  });
  if( settings )
    iio.start( [ app, settings ] );
  else iio.start( app )
}

function create_demo_canvas( elem, SIZE, id, href ){
  
  var canvas, container, h, p, a;
  
  container = document.createElement('div');
  container.className += "demo_wrap";

  a = document.createElement('a');
  a.href = href;

  h = document.createElement('h4');
  h.innerHTML = id;
  h.className += "demo_title";

  canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.width = SIZE;
  canvas.height = SIZE;
  canvas.className += "demo";
  /*canvas.codeurl = testcode_url(R,C);
  canvas.onclick = function(e){
    codeWindow = window.open(this.codeurl, "littleWindow", "location=no,menubar=no,toolbar=no,width=500,height=600,left=0"); 
    codeWindow.moveTo(0,0);
  }*/
  
  a.appendChild(canvas);
  a.appendChild(h);
  container.appendChild(a);
  elem.appendChild(container);
  return canvas;
}
