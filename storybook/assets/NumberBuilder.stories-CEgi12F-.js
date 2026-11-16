import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,r as n}from"./svg-B1CcbL81.js";function r({value:e,title:t,color:r,background:i,...a}){let o=document.createElement(`div`);o.style.color=`#24292f`;try{o.innerHTML=n(e,{...a,...r?{color:r}:{},...i?{background:i}:{},...t?{title:t}:{}})}catch(e){o.setAttribute(`role`,`alert`),o.style.color=`#c92a2a`,o.style.fontFamily=`system-ui, sans-serif`,o.textContent=e.message}return o}var i,a,o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{t(),i={title:`Babylonian Numerals/Number Builder`,render:r,args:{value:`1993`,size:160,gap:22,padding:20,zero:`placeholder`,color:``,background:``,title:``},argTypes:{value:{control:`text`,description:`Any decimal number: whole, fractional, negative or very large. Passed as a string so every digit is kept.`},size:{control:{type:`range`,min:24,max:480,step:4},description:`Image height in pixels.`},gap:{control:{type:`range`,min:0,max:80,step:2}},padding:{control:{type:`range`,min:0,max:40,step:1}},zero:{control:`inline-radio`,options:[`placeholder`,`space`],description:"`placeholder` draws an empty place as two slanted wedges, as late Babylonian scribes did. `space` leaves a gap, as earlier ones did."},color:{control:`text`,description:"A CSS colour, or a gradient: `linear-gradient(to right, red, blue)`, `radial-gradient(…)` or their `repeating-` forms. Empty for currentColor."},background:{control:`text`,description:`A colour or a gradient, as for **color**. Empty for transparent.`},title:{control:`text`,description:`Accessible name. Leave empty to use the number.`}},parameters:{docs:{description:{component:"Type any number in the **value** control and adjust the style. Every control maps to a `toSvg` option."}}}},a={},o={args:{value:`1234567890`},parameters:{docs:{description:{story:`Places count in sixties.`}}}},s={args:{value:`12.5`},parameters:{docs:{description:{story:`A dot starts the fraction: 12.5 is 12 and 30 sixtieths.`}}}},c={args:{value:`3601`},parameters:{docs:{description:{story:`Two slanted wedges hold an empty place.`}}}},l={args:{value:`3601`,zero:`space`},parameters:{docs:{description:{story:`Earlier scribes left a gap instead.`}}}},u={args:{value:`-42`},parameters:{docs:{description:{story:`A horizontal wedge before the number.`}}}},d={args:{value:`1234567`,color:`linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)`}},f={args:{value:`2026.1225`,color:`repeating-linear-gradient(135deg, #e03131 0 3%, #ffffff 3% 6%)`,background:`radial-gradient(#2b8a3e, #0b3d20)`}},p={args:{value:`twelve`},parameters:{docs:{description:{story:`Input that isn't a decimal number shows the error.`}}}},m=[`Playground`,`LargeNumber`,`Fraction`,`EmptyPlace`,`SpaceForZero`,`Negative`,`Rainbow`,`Christmas`,`InvalidInput`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1234567890'
  },
  parameters: {
    docs: {
      description: {
        story: 'Places count in sixties.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    value: '12.5'
  },
  parameters: {
    docs: {
      description: {
        story: 'A dot starts the fraction: 12.5 is 12 and 30 sixtieths.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: '3601'
  },
  parameters: {
    docs: {
      description: {
        story: 'Two slanted wedges hold an empty place.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: '3601',
    zero: 'space'
  },
  parameters: {
    docs: {
      description: {
        story: 'Earlier scribes left a gap instead.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: '-42'
  },
  parameters: {
    docs: {
      description: {
        story: 'A horizontal wedge before the number.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1234567',
    color: 'linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026.1225',
    color: 'repeating-linear-gradient(135deg, #e03131 0 3%, #ffffff 3% 6%)',
    background: 'radial-gradient(#2b8a3e, #0b3d20)'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'twelve'
  },
  parameters: {
    docs: {
      description: {
        story: "Input that isn't a decimal number shows the error."
      }
    }
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{f as Christmas,c as EmptyPlace,s as Fraction,p as InvalidInput,o as LargeNumber,u as Negative,a as Playground,d as Rainbow,l as SpaceForZero,m as __namedExportsOrder,i as default};