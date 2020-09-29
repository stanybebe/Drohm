#version 120
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
vec2 hash( vec2 x )
{
    const vec2 k = vec2( 0.5183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 5.0*sin( (u_time*.4)*10.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}
float noise( in vec2 p )
{
    vec2 i = floor( p*u_resolution.x*.002);
    vec2 f = fract( p *u_resolution.y*.002);
	vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}
void main()
{
  float windowWidth = 520.0;
  float windowHeight = 700.0;
    vec2 uv = gl_FragCoord.xy/u_resolution.xy*.75;
    vec2 r = vec2(gl_FragCoord.xy+ 0.5*u_resolution.xy );
	  float n= noise(1.5*uv);
    float n2= noise(.5*uv)*cos(n*u_time*.0003)*2.;
	  r = .20 * r.xy / u_resolution.xy;

    vec3 col1 = vec3 (0.83922,  0.74118,  0.62745);
    vec3 col2 = vec3 ( 0.76078,  0.40000,  0.23922);
    vec3 col3 = vec3 ( 0.50588 , 0.35686 , 0.37647);
    vec3 pixi;

    float width = cos(sin(.03 * u_time)*5.);
    float width2 = sin(cos(.3 * u_time)*n2);
    float mody = mod(width*width2/n2,sin(cos(r.x+u_time*.004)*6.));
    if(cos(cos(.5* u_time)*n2) < mody){

        pixi = (col1);

    	}
    else {

        pixi =col2;

        }
      if(sin(r.x+u_time)*n2 < mody){

        pixi = col3;

    	}

    gl_FragColor = vec4(pixi,1.0);

}
