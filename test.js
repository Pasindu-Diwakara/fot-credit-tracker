fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AQ.Ab8RN6ImDIF4CLMhBtcJ1oTu8BePUgdeHiHyzn5Kthk4h7rlvQ', {
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({contents:[{parts:[{text:'hello'}]}]})
}).then(r=>r.json()).then(console.log).catch(console.error);
