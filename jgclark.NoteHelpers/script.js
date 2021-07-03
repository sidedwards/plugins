var exports=function(n){"use strict";async function t(){var n;const t=null===(n=Editor)||void 0===n?void 0:n.paragraphs;if(null==t)return;const o=t.filter((n=>"title"===n.type)),e=o.map((n=>{let t="";for(let o=1;o<n.headingLevel;o++)t+="    ";return"".concat(t).concat(n.content)}));if(e.length>0){var l,i;const n=null!==(l=null===(i=o[(await CommandBar.showOptions(e,"Select heading to jump to:")).index].contentRange)||void 0===i?void 0:i.start)&&void 0!==l?l:0;Editor.renderedSelect(n,0),CommandBar.hide()}else console.log("Warning: No headings found in this note")}return(new Date).toISOString().slice(0,10),(new Date).toISOString().slice(0,16),n.jumpToDone=function(){var n;const t=null===(n=Editor)||void 0===n?void 0:n.paragraphs;if(null==t)return;const o=t.filter((n=>2===n.headingLevel)).filter((n=>n.content.startsWith("Done")));if(null!=o){var e,l;const n=null!==(e=null===(l=o[0].contentRange)||void 0===l?void 0:l.start)&&void 0!==e?e:0;Editor.renderedSelect(n,0)}else console.log("Warning: Couldn't find a '## Done' section")},n.jumpToHeading=t,n.jumpToNoteHeading=async function(){const n=DataStore.projectNotes.slice().sort(((n,t)=>t.changedDate-n.changedDate)),o=await CommandBar.showOptions(n.map((n=>{var t;return null!==(t=n.title)&&void 0!==t?t:"untitled"})),"Select note to jump to"),e=n[o.index];null!=e&&null!=e.title?(await Editor.openNoteByTitle(e.title),await t()):console.log("\terror: couldn't open selected note")},n.moveNote=function(n){const{title:t,filename:o}=Editor;if(null==t||null==o)return void console.log("moveNote: warning: No note open.");console.log("move ".concat(t," (filename = ").concat(o,") to ").concat(n));const e=DataStore.moveNote(o,n);null!=e?(Editor.openNoteByFilename(e),console.log("\tmoving note was successful")):console.log("\tmoving note was NOT successful")},n.setTitleFromYAML=function(){var n;const{note:t,content:o}=Editor;if(null==t||null==o)return;console.log("setTitleFromYAML:\n\told title = ".concat(null!==(n=t.title)&&void 0!==n?n:""));const e=o.split("\n");let l=0,i="";for(;l<e.length;){if(e[l].match(/^[Tt]itle:\s*.*/)){var a;const n=e[l].match(/^[Tt]itle:\s*(.*)/);i=null!==(a=null==n?void 0:n[1])&&void 0!==a?a:""}if(""===e[l]||"..."===e[l])break;l+=1}console.log("\tnew title = ".concat(i)),""!==i&&(t.title=i),function(n){var t,o,e,l,i,a,c,s,d,r,u,v,g,m,f;null!=n?"Notes"===n.type?console.log("title: ".concat(null!==(t=n.title)&&void 0!==t?t:"","\n\tfilename: ").concat(null!==(o=n.filename)&&void 0!==o?o:"","\n\tcreated: ").concat(null!==(e=String(n.createdDate))&&void 0!==e?e:"","\n\tchanged: ").concat(null!==(l=String(n.changedDate))&&void 0!==l?l:"","\n\thashtags: ").concat(null!==(i=null===(a=n.hashtags)||void 0===a?void 0:a.join(","))&&void 0!==i?i:"","\n\tmentions: ").concat(null!==(c=null===(s=n.mentions)||void 0===s?void 0:s.join(","))&&void 0!==c?c:"")):console.log("filename: ".concat(null!==(d=n.filename)&&void 0!==d?d:"","\n\tcreated: ").concat(null!==(r=String(n.createdDate))&&void 0!==r?r:"","\n\tchanged: ").concat(null!==(u=String(n.changedDate))&&void 0!==u?u:"","\n\thashtags: ").concat(null!==(v=null===(g=n.hashtags)||void 0===g?void 0:g.join(","))&&void 0!==v?v:"","\n\tmentions: ").concat(null!==(m=null===(f=n.mentions)||void 0===f?void 0:f.join(","))&&void 0!==m?m:"")):console.log("Note not found!")}(t)},Object.defineProperty(n,"__esModule",{value:!0}),n}({});Object.assign(globalThis,exports);
