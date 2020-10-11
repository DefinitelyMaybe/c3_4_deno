import { existsSync, walkSync } from "https://deno.land/std@0.74.0/fs/mod.ts";

function updateImportURLS(match: string) {
  if (!match.includes(".js")) {
    const newValue = match.replace(/'$/, ".js'");
    return newValue;
  } else {
    return match;
  }
}

if (!existsSync("src/mod.js")) {
  for (const entry of walkSync("src")) {
    if (entry.isFile) {
      // I giggled at this
      const newPath = entry.path.replace(/\.ts$/g, ".js")
      Deno.renameSync(entry.path, newPath)
    }
  }  
}


for (const entry of walkSync("src")) {
  if (entry.isFile) {
    if (entry.name.endsWith(".js")) {
      let src = Deno.readTextFileSync(entry.path);

      src = src.replaceAll(/import .+? from '\.\/.+?'/gs, (match) => {
        return updateImportURLS(match);
      });

      Deno.writeTextFileSync(entry.path, src);
    }
  }
}

try {
  Deno.renameSync("src/index.js", "src/mod.js") 
} catch (error) {
  console.error(error);
}

let src = Deno.readTextFileSync("src/mod.js");

src = src.replaceAll(/import '.+?'/g, (match) => {
  return updateImportURLS(match);
});

Deno.writeTextFileSync("src/mod.js", src);

fetch("https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/c3/index.d.ts").then((m)=> {
  if (m.status == 200) {
    m.text().then((text)=> {
      Deno.writeTextFileSync("src/mod.d.ts", text)
    })
  }
})

