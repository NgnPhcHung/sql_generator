import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./style.css";
import Editor, { useMonaco } from "@monaco-editor/react";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { editorAction } from "../../../redux/action/editorSlice";

const SideEditor = (props) => {
  const editorFileContent = useSelector(state => state.editor.editorFileContent)
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const lineRegex = /[^a-zA-Z]/g;
  const regex = /(.*)\((.*)\)/i;
  const regexForeign = /[^)]+$/;
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const [defaultValue, setDefaultValue] = useState('')

  const formatValue = (value) => {
    let mulipleValue = lineRegex.exec(value);
    mulipleValue = mulipleValue.input ? mulipleValue.input : mulipleValue;
    let newValue = mulipleValue.replace(/(\r\n|\n|\r)/gm, "");
    newValue = newValue.replace(/ +(?= )/g, "");
    let splited = newValue.split("Create ");
    let foreignTemp = regexForeign.exec(newValue)[0];
    foreignTemp = foreignTemp.split(",");
    let foreign = [];
    foreignTemp.map((f) => {
      f = f.replace("Foreign ", "").replace(/[<<>>~-]/g, "-");
      f = f.replace(/\s/g, "");
      let classArr = f.replace(/[.]/g, " ");
      foreign.push(classArr);
    });
    dispatch(editorAction.editForeign(foreign));

    return splited;
  };
  const onChange = (changeValue) => {
    let temp = [];

    formatValue(changeValue).map((v, i) => {
      let nameFlag = 0;
      let entityFlag = 0;

      var reg = /\(([^}]*)\)/g;
      let regexValue = v;
      if (regexValue !== null) {
        let tableName = regexValue.substring(0, regexValue.indexOf(' '));
        var result = regexValue.substring(regexValue.indexOf(' ') +1).slice(1,-1);
        let tableEntity = result;

        temp.push({ tableName, tableEntity });

        if (tableName !== null && tableEntity !== null) {
          if (tables.length <= 0) {
            setTables((prevState) => [
              ...prevState,
              { tableName, tableEntity },
            ]);
          } else {
            tables.forEach((tb, index) => {
              nameFlag = 0;
              entityFlag = 0;
              tables.map((v) => {
                if (v.tableName === tableName) {
                  nameFlag++;
                  if (v.tableEntity) entityFlag++;
                }
              });
              if (nameFlag === 0) {
                setTables((prevState) => [
                  ...prevState,
                  { tableName, tableEntity },
                ]);
              } else if (nameFlag === 1) {
                if (tb.tableEntity || entityFlag === 1) {
                  const filteredTable = tables.filter(
                    (item) => item.tableName !== tableName
                  );
                  setTables(filteredTable);
                  setTables((prevState) => [
                    ...prevState,
                    { tableName, tableEntity },
                  ]);
                }
              }
            });
          }
        }
      }
    });
    dispatch(editorAction.editTableList(temp));
  };
  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    let temp = [];

    if (editorRef.current) {
      let tempValue = formatValue(editorRef.current.getValue());
      tempValue.forEach((element) => {
        let regexValue = regex.exec(element);
        if (regexValue !== null) {
          let tableName = regexValue[1];
          let tableEntity = regexValue[2];
          temp.push({ tableName, tableEntity });
        }
      });
    }
    dispatch(editorAction.editTableList(temp));
    editor.focus();
  };

  useEffect(() => {
    const settingMonacoEditor = () => {
      const keywords = ["Create", "PrimaryKey", "Foreign"];
      const typeKeywords = [
        "char",
        "varchar",
        "bool",
        "date",
        "datetime",
        "number",
      ];
      const constrainKeywords = ["NOT NULL", "not null", "UNIQUE", "unique"];
      monaco.languages.register({ id: "mylang" });
      monaco.languages.setMonarchTokensProvider("mylang", {
        keywords,
        typeKeywords,
        constrainKeywords,
        operators: [">>", "<<", "--", '~~',":"],
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes:
          /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

        tokenizer: {
          root: [
            [
              /@?[a-zA-Z0-9][\w$]*/,
              {
                cases: {
                  "@keywords": "keyword",
                  "@typeKeywords": "typeKeyword",
                  "@constrainKeywords": "constrainKeywords",
                  "@operators": "operators",
                  "@default": "identifier",
                },
              },
            ],
            [/[A-Z][\w\$]*/, "type.identifier"],
            { include: "@whitespace" },

            [/[{}()\[\]]/, "@brackets"],
            [/[<>](?!@symbols)/, "@brackets"],
            [
              /@symbols/,
              { cases: { "@operators": "operator", "@default": "" } },
            ],
            [
              /@\s*[a-zA-Z_\$][\w\$]*/,
              { token: "annotation", log: "annotation token: $0" },
            ],

            [/[;,.]/, "delimiter"],

            [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
            [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

            [/'[^\\']'/, "string"],
            [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
            [/'/, "string.invalid"],
          ],
          comment: [
            [/[^\/*]+/, "comment"],
            [/\/\*/, "comment", "@push"], // nested comment
            ["\\*/", "comment", "@pop"],
            [/[\/*]/, "comment"],
          ],
          string: [
            [/[^\\"]+/, "string"],
            [/@escapes/, "string.escape"],
            [/\\./, "string.escape.invalid"],
            [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
          ],
          whitespace: [
            [/[ \t\r\n]+/, "white"],
            [/\/\*/, "comment", "@comment"],
            [/\/\/.*$/, "comment"],
          ],
        },
      });
      monaco.languages.registerCompletionItemProvider("mylang", {
        provideCompletionItems: (model, position) => {
          const suggestions = [
            ...keywords.map((key) => {
              return {
                label: key,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: key,
              };
            }),
            ...typeKeywords.map((key) => {
              return {
                label: key,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: key,
              };
            }),
          ];
          return { suggestions: suggestions };
        },
      });
      monaco.editor.defineTheme("mylang-theme", {
        base: "vs",
        rules: [
          { token: "keyword", foreground: "#56B1FF", fontStyle: "bold" },
          { token: "operator", foreground: "#F3A76E" },
          { token: "string", foreground: "#F1A880" },
          { token: "comment", foreground: "#7D7D7D" },
          { token: "bracket", foreground: "#8381F1" },
          { token: "typeKeyword", foreground: "#FBA03F" },
          { token: "constrainKeywords", foreground: "#D350C1" },
          { token: "delimiter", foreground: "#ffffff" },
          { token: "number", foreground: "#FBA03F" },
          { token: "identifier", foreground: "#D6E4F6" },
        ],
        colors: {
          "editor.foreground": "#000000",
          "editor.background": "#1F1F1F",
          "editorCursor.foreground": "#3F7AFB",
          "editor.lineHighlightBackground": "#474746",
          "editorLineNumber.foreground": "#E0E0E0",
          "editor.selectionBackground": "#6E6E6E",
          "editor.inactiveSelectionBackground": "#CDCDCD",
          "editorBracketMatch.background": "#CDCDCD",
        },
      });
    };
    if (monaco) {
      setLoading(false);
      settingMonacoEditor();
    } else {
      setLoading(true);
    }
  }, [monaco]);

  useEffect(() => {
    let sampleText = `Create user( 
  id: char unique PrimaryKey,
  firstname: varchar,
  lastname: varchar,
  dateofbirth: date,
  address: varchar,
)
Create dogtor( 
  id: char PrimaryKey,
  firstname: char,
)
Create host( 
  id: char PrimaryKey,
  address: varchar,
)
Foreign host.id >> user.id,
Foreign dogtor.firstname -- host.address
    `;
    setLoading(true);
    editorFileContent ? setDefaultValue(editorFileContent):setDefaultValue(sampleText)
    
    if (monaco) setLoading(false);
  }, [editorFileContent, monaco]);

  return loading ? (
    <ScaleLoader />
  ) : (
    <Container>
      <ContentEditor>
        <Editor
          height="95vh"
          width="45vw"
          theme="mylang-theme"
          language="mylang"
          value={defaultValue}
          onChange={onChange}
          onMount={editorDidMount}
        />
      </ContentEditor>
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  height: 100%;
  background: ${(props) => `rgba(${props.theme.textRgba}, 0.9)`};
  color: ${(props) => props.theme.body};
  z-index: 1;
`;

const ContentEditor = styled.div`
  height: 100%;
  overflow-x: auto;
  width: 100%;
  position: relative;
  z-index: 9;
`;

export default SideEditor;
