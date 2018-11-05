(() => {
  // x - Lightweight DOM manipulation library
  class xObject {
    constructor(query) {
      if (query instanceof Node) {
        this.node = query;
      } else if (query instanceof xObject) {
        this.node = query.node;
      } else {
        if (query.startsWith("<")) {
          query = query.substring(1);
          if (query.endsWith(">")) {
            query = query.substring(0, query.length - 1);
          }
          query = query.trim();
          if (query.endsWith("/")) {
            query = query.substring(0, query.length - 1);
          }
          query = query.trim();
          this.node = document.createElement(query);
        } else {
          this.node = document.querySelector(query);
        }
      }
      if (this.node) this.node.listeners = this.node.listeners === undefined ? [] : this.node.listeners;
    }

    value(newValue) {
      if (newValue === undefined) {
        return this.node.value;
      } else {
        this.node.value = newValue;
        return this;
      }
    }
    text(newText) {
      if (newText === undefined) {
        return this.node.textContent;
      } else {
        this.node.textContent = newText;
        return this;
      }
    }
    html(newHtml) {
      if (newHtml === undefined) {
        return this.node.innerHTML;
      } else {
        this.node.innerHTML = newHtml;
        return this;
      }
    }

    append(query) {
      let node;
      if (query instanceof Node) {
        node = query;
      } else if (query instanceof xObject) {
        node = query.node;
      } else {
        let template = document.createElement("template");
        template.innerHTML = query.trim();
        node = template.content.firstChild;
      }

      this.node.appendChild(node);
      return new xObject(node);
    }
    prepend(query) {
      let node;
      if (query instanceof Node) {
        node = query;
      } else if (query instanceof xObject) {
        node = query.node;
      } else {
        let template = document.createElement("template");
        template.innerHTML = query.trim();
        node = template.content.firstChild;
      }

      this.node.insertBefore(node, this.node.firstChild);
      return new xObject(node);
    }

    appendTo(query) {
      new xObject(query).append(this.node);
      return this;
    }
    prependTo(query) {
      new xObject(query).prepend(this.node);
      return this;
    }

    classes(newClasses) {
      if (newClasses === undefined) {
        return this.node.className.split(" ");
      } else {
        this.node.className = newClasses.join(" ");
        return this;
      }
    }
    addClass(newClass) {
      this.node.className += " ";
      this.node.className += newClass;
      return this;
    }
    id(newId) {
      if (newId === undefined) {
        return this.node.id;
      } else {
        this.node.id = newId;
        return this;
      }
    }

    style(key, value) {
      if (key === undefined) {
        return this.node.style;
      } else if (value === undefined) {
        return this.node.style[key];
      } else {
        this.node.style[key] = value;
        return this;
      }
    }

    destroy() {
      this.node.parentNode.removeChild(this.node);
    }

    on(eventName, handler, that) {
      this.node.listeners[handler] = event => { handler(event, that); };
      this.node.addEventListener(eventName, this.node.listeners[handler], false);
      return this;
    }
    rmOn(eventName, handler) {
      this.node.removeEventListener(eventName, this.node.listeners[handler], false);
      return this;
    }
    click(handler, that) {
      if (handler === undefined) {
        this.node.click();
      } else {
        this.on("touchend", event => { event.preventDefault(); handler(that); }, true);
        this.on("click", event => { event.preventDefault(); handler(that); }, true);
      }
      return this;
    }
    hover(handler, that) {
      if (handler === undefined) {
        this.node.click();
      } else {
        this.on("touchstart", event => { event.preventDefault(); handler(that); }, true);
        this.on("mouseover", event => { event.preventDefault(); handler(that); }, true);
      }
      return this;
    }

    find(query) {
      return new xObject(this.node.querySelector(query));
    }
    parent() {
      return new xObject(this.node.parentNode);
    }
  }

  window.x = query => {
    return new xObject(query);
  };

  // xAct - Simple JavaScript templating library
  window.xAct = (element, data) => {
    let html = new xObject(element).html();
    html = new xObject("<textarea>").html(html).value();
  
    const templateRegex = /<<([^>>]+)?>>/g;
    const blockRegex = /(^( )*(if|for|else|switch|case|break|var|let|const|{|}))(.*)?/g;
      
    let code = "var list = [];\n";
    let index = 0;
    let match;
    
    const append = (line, isJS) => {
      const checkAssignment = js => {
        if (!js.includes("=")) return false;
        const quoteRegex = /"|'|`/;
        let isInString = false;
        let hasBeginning = js[0] !== "=";
        let currentQuote = "";
        let index = 0;
        for (let character of js) {
          let previous = index === 0 ? character : js[index - 1];
          if (quoteRegex.test(character) && previous !== "\\") {
            if (isInString) {
              if (character === currentQuote) isInString = false;
            } else {
              isInString = true;
              currentQuote = character;
            }
          }
          if (character === "=" && !isInString && hasBeginning) return true;
          index++;
        }
        return false;
      };
      
      if (isJS) {
        code += line.match(blockRegex) || checkAssignment(line.trim()) ? (line.trim().endsWith(";") ? line : line + ";") + "\n" : `list.push(${line});\n`;
      } else {
        code += line === "" ? "" : `list.push("${line.replace(/"/g, "\\\"")}");\n`;
      }
      return append;
    }
    
    while (match = templateRegex.exec(html)) {
      append(html.slice(index, match.index))(match[1], true);
      index = match.index + match[0].length;
    }
    append(html.substr(index, html.length - index));
    code += "return list.join(\"\");";
    new xObject(element).html(new Function(code.replace(/[\r\t\n]/g, "")).apply(data));
  }

  // xJax - A wrapper around fetch to make it slightly simpler
  window.xJax = async (uri, queries) => {
    let queryString = "";
    if (queries !== undefined) {
      queryString += "?";
      for (let key in queries) {
        queryString += encodeURIComponent(key);
        queryString += "=";
        queryString += encodeURIComponent(queries[key]);
        queryString += "&";
      }
      queryString = queryString.substring(0, queryString.length - 1);
    }

    let response = await fetch(uri + queryString);
    let text = await response.text();
    return text;
  }
})();
