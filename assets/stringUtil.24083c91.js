const a=e=>e.replace(/-/g,"\\-"),c=(e,s)=>e.replace(new RegExp(`[${a(s)}]`,"g"),""),p=(e,s)=>e.replace(new RegExp(`[^${a(s)}]`,"g"),"");export{c as d,p as s};
