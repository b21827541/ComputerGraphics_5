const vs = `#version 300 es
  in  vec4 vPosition;
  in  vec3 vNormal;
  in vec2 aTextureCoord;
  out vec4 fColor;
  out vec2 vTextureCoord;
  
  uniform vec4 ambientProduct, diffuseProduct, specularProduct;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform vec4 lightPosition;
  uniform vec4 lightDirection;
  uniform float cutOff;
  uniform float outercutOff;
  uniform float shininess;
  uniform float lightOn;
  uniform float sx, sy, sz;
  uniform vec4 u_Translation;

 
  void main() {
    mat4 viewMatrix = inverse(modelViewMatrix);
    //ambient
    vec4 ambient = ambientProduct;

    //diffuse
    vec4 NN = vec4(vNormal,0);
    vec3 N = normalize( (modelViewMatrix*NN).xyz);
    vec3 pos = (modelViewMatrix * vPosition).xyz;
    vec3 light = (modelViewMatrix*lightPosition).xyz;
    //lightdir
    vec3 lightDir = (modelViewMatrix * lightDirection).xyz;
    vec3 LD = normalize(light - lightDir);
    vec3 L = normalize( light - pos );
    // diff angle
    float Kd = max( dot(N, L), 0.0 );
    vec4  diffuse = Kd*diffuseProduct;
    
    //specular
    vec3 E = normalize( -pos );
    vec3 H = normalize( L + E );
    vec3 reflectDir = reflect(-L, N);
    float Ks = pow( max(dot(H, reflectDir), 0.0), shininess );
    vec4  specular = Ks * specularProduct;

    float theta = dot(L, normalize(-LD));
    float epsilon = (cutOff - outercutOff);
    float intensity = clamp((theta - outercutOff) / epsilon, 0.0, 1.0);
    diffuse  *= intensity;
    specular *= intensity;
    
    float distance    = length(light - pos);
    float attenuation = 1.0 / (1.0 + 0.09 * distance +  0.032 * (distance * distance));    
    ambient  *= attenuation; 
    diffuse   *= attenuation;
    specular *= attenuation;   
    
    fColor =  ambient + diffuse +specular;
    
    fColor.a = 1.0;
    
    
    mat4 scaleMatrix = mat4(sx, 0.0, 0.0, 0.0,
                                0.0, sy, 0.0, 0.0,
                                0.0, 0.0, sz, 0.0,
                                0.0, 0.0, 0.0, 1.0
        );

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition) * scaleMatrix + u_Translation;
    
    
    vTextureCoord = aTextureCoord ;
  }
`;

const fs = `#version 300 es
  precision mediump float;

  in vec2 vTextureCoord;
  in vec4 fColor;
  uniform sampler2D uSampler;
  uniform sampler2D uSampler2;
  out vec4 oColor;

  void
  main()
  {
    oColor = fColor * texture(uSampler, vTextureCoord)  ;
  }
`;
