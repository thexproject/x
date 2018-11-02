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
      return this;
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
      return this;
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

    destroy() {
      this.node.parentNode.removeChild(this.node);
    }

    click(handler, that) {
      if (handler === undefined) {
        this.node.click();
      } else {
        this.node.onclick = () => {
          handler(that);
        }
      }
      return this;
    }

    find(query) {
      return new xObject(this.node.querySelector(query));
    }
  }

  window.x = query => {
    return new xObject(query);
  };

  // xAct - Simple JavaScript templating library
  
  window.xAct = (element, data) => {
    let html = x(element).html();
    html = x("<textarea>").html(html).value();
  
    let templateRegex = /<<([^>>]+)?>>/g;
    let blockRegex = /(^( )*(if|for|else|switch|case|break|var|let|const|{|}))(.*)?/g;
      
    let code = "var list = [];\n";
    let index = 0;
    let match;
    
    const append = (line, isJS) => {
      line = line.trim();
      if (isJS) {
        code += line.match(blockRegex) ? (line.endsWith(";") ? line : line + ";") + "\n" : "list.push(" + line + ");\n";
      } else {
        code += line === "" ? "" : "list.push(\"" + line.replace(/"/g, "\\\"") + "\");\n";
      }
      return append;
    }
    
    while (match = templateRegex.exec(html)) {
      append(html.slice(index, match.index))(match[1], true);
      index = match.index + match[0].length;
    }
    append(html.substr(index, html.length - index));
    code += "return list.join(\"\");";

    console.log("code is", code);
    
    x(element).html(new Function(code.replace(/[\r\t\n]/g, "")).apply(data));
  }

  // xJax - A wrapper around fetch to make it simpler

  window.xJax = async (uri, queries) => {
    let queryString = "";
    if (queries !== undefined) {
      queryString += "?"
      for (let key in queries) {
        queryString += encodeURIComponent(key);
        queryString += "=";
        queryString += encodeURIComponent(queries[key]);
        queryString += "&";
      }
      queryString = queryString.substring(0, str.length - 1);
    }

    let response = await fetch(uri + queryString);
    let text = await response.text();
    return text;
  }
})();
