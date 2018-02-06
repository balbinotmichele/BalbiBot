const botgram = require("botgram")
const bot = botgram("460020160:AAFha5YuMaLohy52YpWjtkRSbDK5jIBkbqM")

bot.command("start", "help", (msg, reply) =>
  reply.text("Use the command /encrypt <keyword> <text> to encrypt a sentence \n Use /decrypt to decrypt"))

bot.command("encrypt", (msg, reply, next) => {
  var keyword = msg.args().split(" ").slice(0)[0];
  var text = msg.args().split(" ").slice(1).join(" ");
  let chiave = normalize(keyword);
  let testo = normalize(text);
  if(text != undefined) {
      reply.text(Encrypt(testo, chiave));
  }
  else reply.text("Add some text after the /encrypt command");
});

bot.command("decrypt", (msg, reply, next) => {
  var text = msg.args()
  if(text != undefined) {
      testo = text;
      reply.text("Send me the /dkey <keyword> used to encrypt this text")
  }
  else reply.text("Add some text after the /decrypt command");
});

/*bot.command("ekey", (msg, reply) => {
    var keyword = msg.args();
    if(keyword != undefined || keyword.length <= 2) {
      chiave = keyword;
      if(testo != "") {
        testo = normalize(testo);
        chiave = normalize(chiave);
        if (testo != undefined && chiave != undefined) {
          let ciphertext = Encrypt(testo, chiave);
          console.log(ciphertext);
          reply.text(ciphertext);
        }
      }
    }
    else reply.text("Send me the key (lenght must be > 2)");
});*/

/*bot.command("dkey", (msg, reply) => {
  var keyword = msg.args();
  if(keyword != undefined || keyword.length <= 2) {
    chiave = keyword;
    if(testo != "") {
      testo = normalize(testo);
      chiave = normalize(chiave);
      if (testo != undefined && chiave != undefined) {
        let plaintext = Decrypt(testo, chiave);
        console.log(plaintext);
        reply.text(plaintext);
      }
    }
  }
  else reply.text("Send me the key (lenght must be > 2)");
});*/

var chars = "abcdefghijklmnopqrstuvwxyz";

function Enc(testoinchiaro = "", chiave = "") {
  if (testoinchiaro == "" || chiave == "") return;
  while(testoinchiaro.length % chiave.length != 0) //il testo e la chiave sono minuscoli e senza spazi
    testoinchiaro += "x"; //riempie il testo fino a che sia un "rettangolo"
  let j = 0, a = 0, res = [];
  let testocifrato = "";
  for(let k in chiave) {
    while (a < alpha.length) {
      if(k == a) {
        var ind = chiave.indexOf(alpha.charAt(a)); //restituisce la posizione del carattere 
        res[j] = i++;
      }
      j++;
    }
  }
  console.log(res);
}

bot.command((msg, reply) =>
  reply.text("Invalid command."))
  
  function Encrypt(plaintext, key, pc) {
      let klen = key.length;
      if (pc == undefined) pc = "x";
      while (plaintext.length % klen != 0) {
          plaintext += pc.charAt(0);
      }
      let colLength = plaintext.length / klen;
      let ciphertext = "";
      k = 0;
      for (i = 0; i < klen; i++) {
          while (k < 26) {
              t = key.indexOf(chars.charAt(k));
              arrkw = key.split("");
              arrkw[t] = "_";
              key = arrkw.join("");
              if (t >= 0) break;
              else k++;
              //console.log(t);
          }
          for (j = 0; j < colLength; j++) { 
              ciphertext += plaintext.charAt(j * klen + t);
          }
      }
      return ciphertext;
  }
  
  function Decrypt(ciphertext, keyword) {
    let klen = keyword.length;
    // first we put the text into columns based on keyword length
    let cols = new Array(klen);
    let colLength = ciphertext.length / klen;
    for (i = 0; i < klen; i++) cols[i] = ciphertext.substr(i * colLength, colLength);
    // now we rearrange the columns so that they are in their unscrambled state
    let newcols = new Array(klen);
    j = 0;
    i = 0;
    while (j < klen) {
        t = keyword.indexOf(chars.charAt(i));
        if (t >= 0) {
            newcols[t] = cols[j++];
            arrkw = keyword.split("");
            arrkw[t] = "_";
            keyword = arrkw.join("");
        } else i++;
    }
    // now read off the columns row-wise
    let plaintext = "";
    for (i = 0; i < colLength; i++) {
        for (j = 0; j < klen; j++) {
            plaintext += newcols[j].charAt(i);
        }
    }
    return plaintext;
}
  
  function normalize(value) {
      //console.log(value);
      if(value != undefined)
        return value.toLowerCase().replace(/[^a-z]/g, "");
      else return
  }