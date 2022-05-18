"use strict";

var gl;
var verbufferArray = [];
var normalbufferArray = [];
var lightOn = 1.0;
const textureCoordinates = [
        // Front
        0, 1,
        0, 0,
        1, 0,
        0, 1,
        1, 0,
        1, 1,
        // Back
        0, 1,
        0, 0,
        1, 0,
        0, 1,
        1, 0,
        1, 1,
        // Top
        0, 1,
        0, 0,
        1, 0,
        0, 1,
        1, 0,
        1, 1,
        // Bottom
        0, 1,
        0, 0,
        1, 0,
        0, 1,
        1, 0,
        1, 1,
        // Right
        0, 1,
        0, 0,
        1, 0,
        0, 1,
        1, 0,
        1, 1,
        // Left
        0, 1,
        0, 0,
        1, 0,
        0, 1,
        1, 0,
        1, 1
      ];
      
const textureCoordinates2 = [
      /*0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0    */
        0, 0,
        0, 1,
        1, 0,
        0, 1,
        1, 1,
        1, 0
      ];      
const surfaceVertices =  [1.5, 0.0, -1.5, 1.0,
       -1.5, 0.0, -1.5, 1.0,
       -1.5, 0.0, 1.5, 1.0,
       1.5, 0.0, -1.5, 1.0,
       -1.5, 0.0, 1.5, 1.0,
       1.5, 0.0, 1.5, 1.0];
var surfaceNormals = [0, 9, 0,0, 9, 0,0, 9, 0,0, 9, 0,0, 9, 0,0, 9, 0];
var pointsArray = [];
var normalsArray = [];
var textureCoords = [];
var vertices = [
        -0.015625, -0.0,  0.015625, 1.0 ,
        -0.015625,  0.03125,  0.015625, 1.0 ,
        0.015625,  0.03125,  0.015625, 1.0 ,
        0.015625, -0.0,  0.015625, 1.0 ,
        -0.015625, -0.0, -0.015625, 1.0 ,
        -0.015625,  0.03125, -0.015625, 1.0 ,
        0.015625,  0.03125, -0.015625, 1.0 ,
        0.015625, -0.0, -0.015625, 1.0 
];
/*var vertices2 = [
        -1, -0.5,  1, 1.0 ,
        -1,  0.5,  1, 1.0 ,
        1,  0.5,  1, 1.0 ,
        1, -0.5,  1, 1.0 ,
        -1, -0.5, -1, 1.0 ,
        -1,  0.5, -1, 1.0 ,
        1,  0.5, -1, 1.0 ,
        1, -0.5, -1, 1.0 
];*/
var a = 2.5, b = 1.5, c = -6.7, d = 0.0;
//var lightPosition = [a, b, c, d ];
var e = 14, f = -2.4, g = -4.6;
//var lightDirection = [e, f, g, 1.0];
var lightAmbient = [0.2, 0.2, 0.2, 1.0];
var lightDiffuse = [1.0, 1.0, 1.0, 1.0];
var lightSpecular = [0.2, 0.2, 0.2, 1.0];

var materialAmbient = [1.0, 1.0, 1.0, 1.0];
var materialDiffuse = [1.0, 1.0, 1.0, 1.0];
var materialSpecular = [1.0, 1.0, 1.0, 1.0];
var materialShininess = 100.0;
var ambientColor, diffuseColor, specularColor;
var modelView, projection;
var viewerPos = [];

var aspect;

var camX=0,camY=0.5,camZ=-0.7, atX=0, atY=-1.4, atZ=1.0;
var lightPosition = [camX, camY, camZ, d ];
var lightDirection = [atX, atY, atZ, 1.0];
var texture;
var texture2;
function quad(a, b, c, d, x, y) {
     var t1 = [];
     
     t1.push(vertices[b*4+0]+x - vertices[a*4+0]+x); t1.push(vertices[b*4+1] - vertices[a*4+1]) ;t1.push(vertices[b*4+2]+y - vertices[a*4+2]+y); t1.push(vertices[b*4+3] - vertices[a*4+3]);
     
     var t2 = [];
     t2.push(vertices[c*4+0]+x - vertices[b*4+0]+x); t2.push(vertices[c*4+1] - vertices[b*4+1]) ;t2.push(vertices[c*4+2]+y - vertices[b*4+2]+y); t2.push(vertices[c*4+3] - vertices[b*4+3]);
     
     var normal = cross(t1, t2);
     // normal = vec3 normal
     var array=[];
     var norArr=[];
     array.push(vertices[a*4] + x); array.push(vertices[a*4+1]); array.push(vertices[a*4+2] + y);array.push(vertices[a*4+3]); 
     norArr.push(normal[0]); norArr.push(normal[1]); norArr.push(normal[2]); 
     array.push(vertices[b*4] + x); array.push(vertices[b*4+1]); array.push(vertices[b*4+2] + y);array.push(vertices[b*4+3]); 
     norArr.push(normal[0]); norArr.push(normal[1]); norArr.push(normal[2]);  
     array.push(vertices[c*4] + x); array.push(vertices[c*4+1]); array.push(vertices[c*4+2] + y);array.push(vertices[c*4+3]); 
     norArr.push(normal[0]); norArr.push(normal[1]); norArr.push(normal[2]);  
     array.push(vertices[a*4] + x); array.push(vertices[a*4+1]); array.push(vertices[a*4+2] + y);array.push(vertices[a*4+3]); 
     norArr.push(normal[0]); norArr.push(normal[1]); norArr.push(normal[2]);  
     array.push(vertices[c*4] + x); array.push(vertices[c*4+1]); array.push(vertices[c*4+2] + y);array.push(vertices[c*4+3]); 
     norArr.push(normal[0]); norArr.push(normal[1]); norArr.push(normal[2]); 
     array.push(vertices[d*4] + x); array.push(vertices[d*4+1]); array.push(vertices[d*4+2] + y);array.push(vertices[d*4+3]); 
     norArr.push(normal[0]); norArr.push(normal[1]); norArr.push(normal[2]);  
     pointsArray.push(array); normalsArray.push(norArr);
}
function colorCube(x, y)
{
    quad( 1, 0, 3, 2, x, y);
    quad( 2, 3, 7, 6, x, y );
    quad( 3, 0, 4, 7, x, y );
    quad( 6, 5, 1, 2, x, y );
    quad( 4, 5, 6, 7, x, y );
    quad( 5, 4, 0, 1, x, y );
}

window.onload = function() {
    init();
};

function init(){
    const canvas = document.querySelector("#canvas");
    gl = canvas.getContext("webgl2");
    
    if(!gl) {
        alert("not supported");
        return;
    }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    //creating shaders
    const vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex_shader, vs);
    gl.compileShader(vertex_shader);
    if ( !gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS) ) {
        var info = gl.getShaderInfoLog(vertex_shader);
        alert("error: \n" + info);
        return;
    }
    
    const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment_shader, fs);
    gl.compileShader(fragment_shader);
    if ( !gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS) ) {
        var info = gl.getShaderInfoLog(fragment_shader);
        alert("error :  \n" + info);
        return;
    }
    //creating program
    const program = gl.createProgram();
    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    gl.linkProgram(program);
    if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
        var info = gl.getProgramInfoLog(program);
        alert("error : \n" + info);
        return;
    }
    
    gl.useProgram(program);
    
    document.onkeydown =  (event)  => {
        switch (event.keyCode) {
            case 38 :
                camZ += 0.02;
                lightPosition[2] += 0.02;
                //lightDirection[3] += 0.02;
                //camY -= 0.03;
                //atY -= 0.03;
                
                break;
            case 40 :
                //camY += 0.03;
                //atY += 0.03;
                camZ -= 0.02;
                lightPosition[2] -= 0.02;
                //lightDirection[3] -= 2;
                break;
            case 37:
                camX += 0.02;
                atX += 0.02;
                lightPosition[0] += 0.02;
                //lightDirection[0] += 2;
                break;
            case 39:
                camX -= 0.02;
                atX -= 0.02;
                lightPosition[0] -= 0.02;
                //lightDirection[0] -= 2;
                break;
            case 33:
                camY -= 0.02;
                atY -= 0.02;
                lightPosition[1] += 0.02;
                //lightDirection[1] += 2;
                break;
            case 34:
                camY += 0.02;
                atY += 0.02;
                lightPosition[1] -= 0.02;
               // lightDirection[1] -= 2;
                break;
            case 79:
                if(lightOn === 1.0)
                    lightOn = 0.0;
                else
                    lightOn = 1.0;
                break;
        }
    };
    
    canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

    canvas.requestPointerLock();

    document.exitPointerLock = document.exitPointerLock    ||
                           document.mozExitPointerLock;

    document.exitPointerLock();

    let isActiveE = 0;

    document.onkeypress = function (e) {
        if(e.key === "e"){
            if(!isActiveE){
                canvas.requestPointerLock();
                isActiveE = 1;
            }
            else{
                document.exitPointerLock();
                isActiveE = 0;
            }
        }
    };

    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    function lockChangeAlert() {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            document.addEventListener("mousemove", update, false);
        } else {
            document.removeEventListener("mousemove", update, false);
        }
    }

    function update(e) {
        camX += e.movementX * 0.002;
        camY -= e.movementY * 0.002;
    }
    for(var i = 0; i < 25; i++){
        for(var j = 0; j < 25; j++){
            colorCube(j*0.08-0.72, i*0.08-0.72);
        }
    }
    
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    /*gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );*/
    var vPosition = gl.getAttribLocation(program, "vPosition");
    /*gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);*/
    var atextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
    
    //var nBuffer1 = createBuffer(normalsArray);
    //var vBuffer1 = createBuffer(pointsArray);
    var points = [];
    for(var j = 0; j < 625; j++){
        //var kup= [];
        var a =pointsArray[j*6];
        var b =pointsArray[j*6+1];
        var c =pointsArray[j*6+2];
        var d =pointsArray[j*6+3];
        var e =pointsArray[j*6+4];
        var f =pointsArray[j*6+5];
        var g = a.concat(b);
        g = g.concat(c);
        g = g.concat(d);
        g = g.concat(e);
        g = g.concat(f);
        //kup.push(g);
        points.push(g);
    }
    var norms = [];
    for(var j = 0; j < 625; j++){
        //var kupnor= [];
        var a =normalsArray[j*6];
        var b =normalsArray[j*6+1];
        var c =normalsArray[j*6+2];
        var d =normalsArray[j*6+3];
        var e =normalsArray[j*6+4];
        var f =normalsArray[j*6+5];
        var g = a.concat(b);
        g = g.concat(c);
        g = g.concat(d);
        g = g.concat(e);
        g = g.concat(f);
        //kupnor.push(g);
        norms.push(g);
    }
    
    var norbuf;
    var verbuf;
    for(var i = 0; i < 625; i++){
        verbuf= createBuffer(points[i]);
        verbufferArray.push(verbuf);
    }
    for(var i = 0; i < 625; i++){
        norbuf= createBuffer(norms[i]);
        normalbufferArray.push(norbuf);
    }
    
    //var surfaceVertices = pointsArray;
    var bufferSurface = createBuffer(surfaceVertices);
    var bufferSurfNorm = createBuffer(surfaceNormals);
    
    const textureCoordBuffer = createBuffer(textureCoordinates);
    var uSampler = gl.getUniformLocation(program, 'uSampler');
    texture = loadTexture(gl, 'cube/texture_cube.png');
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.vertexAttribPointer(atextureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(atextureCoord);
    
    // Bind the texture to texture unit 0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(uSampler, 0);
    
    var textureCoordinates2 = textureCoordinates;
    const textureCoordBuffer2 = createBuffer(textureCoordinates2);
    var uSampler2 = gl.getUniformLocation(program, 'uSampler2');
    texture2 = loadTexture(gl, 'ground/texture_ground.bmp');
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer2);
    gl.vertexAttribPointer(atextureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(atextureCoord);
    
    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(uSampler2, 1);
    
    
    
    
    const scene = {
        program: program,
        vertexLocation: vPosition,
        normalLocation: vNormal,
        textureLocation: atextureCoord,
        type: gl.FLOAT, // Constant
        object : {
            vbuffer: verbufferArray,
            nbuffer: normalbufferArray,
            vertices: points
        },
        surface: {
            nbuffer : bufferSurfNorm,
            vbuffer: bufferSurface,
            vertices: surfaceVertices
        }
    };
    console.log(norms[1].length);
    
    //viewerPos = [0.0, 0.0, -20.0];
    
    //projection = orth(-1, 1, -1, 1, -100, 100);
    var fovy = 80.0;
    aspect = canvas.width/canvas.height;
    var near = 0.001;
    var far = 100.0;
    projection = perspective(fovy, aspect, near, far);
    
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       new Float32Array(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       new Float32Array(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), 
       new Float32Array(specularProduct) );	
    
       
    gl.uniform1f(gl.getUniformLocation(program, 
       "shininess"),materialShininess);
    
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),
       false, new Float32Array(projection));
    
    render();
    
    function render(){
            
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        gl.uniform1f(gl.getUniformLocation(program, "cutOff"), 
           radians(12.0) );
        gl.uniform1f(gl.getUniformLocation(program, "outercutOff"), 
           radians(13.0) );
        gl.uniform4fv(gl.getUniformLocation(program, "lightDirection"), 
           new Float32Array(lightDirection) );
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), 
           new Float32Array(lightPosition) );
        gl.uniform1f(gl.getUniformLocation(program, 
       "lightOn"),lightOn);
        /*modelView = [1.0, 0.0, 0.0, 0.0,
                     0.0, 1.0, 0.0, 0.0,
                     0.0, 0.0, 1.0, 0.0,
                     0.0, 0.0, 0.0, 1.0
        ];*/
        modelView = lookAt([camX, camY, camZ], [atX+0.0,atY,atZ], [0.0,1.0,0.0]);
        //camY-=0.01;
        gl.uniformMatrix4fv( gl.getUniformLocation(program,
                "modelViewMatrix"), false, new Float32Array(modelView) );

        drawScene(scene);


        requestAnimationFrame(render);
    }
}

function createBuffer(data){
    const Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    return Buffer;
}

function drawScene(scene)
{
    let program = scene.program;
    let vertexLocation = scene.vertexLocation;
    let normalLocation = scene.normalLocation;
    let type = scene.type;
    let atextureCoord = scene.textureLocation;
    
    
    
    
    for(var i = 0; i < 625; i++){
        
        gl.uniform4f(gl.getUniformLocation(program, "u_Translation"), 0.0, 0.0, 0.0, 0.0);
        gl.uniform1f(gl.getUniformLocation(program, "sx"), 1);
        gl.uniform1f(gl.getUniformLocation(program, "sy"), 1);
        gl.uniform1f(gl.getUniformLocation(program, "sz"), 1);
        gl.bindBuffer(gl.ARRAY_BUFFER, normalbufferArray[i]);
        gl.vertexAttribPointer( normalLocation, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( normalLocation );
        gl.bindBuffer(gl.ARRAY_BUFFER, verbufferArray[i]);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.vertexAttribPointer(vertexLocation, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexLocation);
        gl.drawArrays( gl.TRIANGLES, 0, 36 );
    }
    

    //gl.disableTexture(gl.TEXTURE0);
    //gl.activeTexture(gl.TEXTURE0+1);
    //gl.bindTexture(gl.TEXTURE_2D, texture2);    
    gl.uniform4f(gl.getUniformLocation(program, "u_Translation"), 0.0, 0.0, 0.0, 0.0);
    gl.uniform1f(gl.getUniformLocation(program, "sx"), 1.0);
    gl.uniform1f(gl.getUniformLocation(program, "sy"), 1);
    gl.uniform1f(gl.getUniformLocation(program, "sz"), 1.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, scene.surface.nbuffer);
    gl.bindTexture(gl.TEXTURE_2D, texture2);

    gl.vertexAttribPointer( normalLocation, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( normalLocation );
    gl.bindBuffer(gl.ARRAY_BUFFER, scene.surface.vbuffer);
    gl.vertexAttribPointer(vertexLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexLocation);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
    
}
function orth( left, right, bottom, top, near, far )
{
    if ( left === right ) { throw "left and right are equal"; }
    if ( bottom === top ) { throw "bottom and top are equal"; }
    if ( near === far )   { throw "near and far are equal"; }

    var w = right - left;
    var h = top - bottom;
    var d = far - near;

    
    var result = [2.0/w, 0.0, 0.0, -(left + right)/w,
                  0.0, 2.0/h, 0.0, -(top + bottom)/h,
                  0.0, 0.0, -2.0/d, -(near + far)/d,
                  0.0, 0.0, 0.0, 1.0
    ];
    return result;
}

function perspective( fovy, aspect, near, far )
{
    var f = 1.0 / Math.tan( radians(fovy) / 2 );
    var x = (far + near)/(near - far);
    var y = (2.0 * far * near)/(near - far);
    var result = [f/aspect, 0.0, 0.0, 0.0,
                  0.0, f, 0.0, 0.0,
                  0.0, 0.0, x, -1.0,
                  0.0, 0.0, y, 0.0
    ];

    return result;
}

function mult(u, v){
    var result = [];
    if ( u.length !== v.length ) {
        throw "vectors are not the same dimension";
    }

    for ( var i = 0; i < u.length; ++i ) {
        result.push( u[i] * v[i] );
    }

    return result;
}

function cross( u, v )
{
    if ( !Array.isArray(u) || u.length < 3 ) {
        throw "cross err";
    }

    if ( !Array.isArray(v) || v.length < 3 ) {
        throw "cross err";
    }

    var result = [
        u[1]*v[2] - u[2]*v[1],
        u[2]*v[0] - u[0]*v[2],
        u[0]*v[1] - u[1]*v[0]
    ];

    return result;
}
function subtractVec(u, v){
    return [u[0] - v[0], u[1] - v[1], u[2] - v[2]];
}
function normalize(u){
    var len = Math.sqrt(u[0] * u[0] + u[1] * u[1] + u[2] * u[2]);
    if(len > 0.0001){
        for ( var i = 0; i < u.length; ++i ) {
           u[i] /= len;
        }
    }else
        u = [0.0, 0.0, 0.0];
    return u;
}
function negate( u )
{
    var result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( -u[i] );
    }

    return result;
}
function loadTexture(gl, loc) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([253, 106, 2, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = loc;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

function lookAt(eye, at, up){
    var v = normalize( subtractVec(eye, at) );
    var n = normalize( cross(up, v) ); 
    var u = normalize( cross(v, n) ); 
    v = negate( v );
    var result = [n[0], n[1], n[2], 0.0,
                  u[0], u[1], u[2], 0.0,
                  v[0], v[1], v[2], 0.0,
                  eye[0], eye[1], eye[2], 1.0
    ];
    return result;
}