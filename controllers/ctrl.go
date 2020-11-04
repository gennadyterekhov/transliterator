package controllers

import (
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	"transliterator/helper"
)

var templates *template.Template

func GetFile(filename string) string {
	configStr, err := ioutil.ReadFile(filename)
	helper.Check(err)

	return string(configStr)
}

func GetView(viewName string) string {
	return GetFile("views/html/" + viewName + ".html")
}

func prepare(templateName string) string {
	templateObj, err := template.New("templateTest").Parse(GetView("templates/" + templateName))
	helper.Check(err)

	done := helper.Capture()
	err = templateObj.Execute(os.Stdout, struct{}{})
	helper.Check(err)

	capturedOutput, err := done()
	helper.Check(err)

	return capturedOutput
}

func renderOld(w http.ResponseWriter, templateName string, context struct{}) {

	templateObj, err := template.New("templateTest").Parse(GetView(templateName))
	helper.Check(err)

	err = templateObj.Execute(w, context)
	helper.Check(err)
}

func render(w http.ResponseWriter, templateName string, context struct{}) {

	// lp := filepath.Join("views/html/templates", "layout.html")
	// fp := filepath.Join("views/html/templates", "example.html")

	templateSetObj, err := template.ParseFiles(
		// "/home/gena/go/src/wordgame/views/html/templates/header.html",
		// "/home/gena/go/src/wordgame/views/html/templates/footer.html",
		"views/html/templates/template.html",
		"views/html/"+templateName+".html",
	)
	helper.Check(err)
	err = templateSetObj.ExecuteTemplate(w, templateName, context)
	helper.Check(err)
}

// func prepareHeader() string {
// 	templateObj, err := template.New("templateTest").Parse(GetView("templates/header"))
// 	helper.Check(err)

// 	done := helper.Capture()
// 	err = templateObj.Execute(os.Stdout, struct{}{})
// 	helper.Check(err)

// 	capturedOutput, err := done()
// 	helper.Check(err)

// 	return capturedOutput

// 	// var allFiles []string
// 	// files, err := ioutil.ReadDir("/home/gena/go/src/wordgame/views/html/templates")
// 	// helper.Check(err)
// 	// for _, file := range files {
// 	// 	filename := file.Name()
// 	// 	allFiles = append(allFiles, "/home/gena/go/src/wordgame/views/html/templates"+filename)
// 	// }

// 	// // templates, err = template.ParseFiles(allFiles...)
// 	// templates, err = template.ParseGlob("/home/gena/go/src/wordgame/views/html/templates/*")
// 	// helper.Check(err)

// 	// s1 := templates.Lookup("/home/gena/go/src/wordgame/views/html/templates/header.html")
// 	// s1.ExecuteTemplate(os.Stdout, "header", nil)
// 	// fmt.Printf("%v", s1)
// 	// s2 := templates.Lookup("content.html")
// 	// s2.ExecuteTemplate(os.Stdout, "content", nil)
// 	// fmt.Println(s2)
// 	// s3 := templates.Lookup("footer.html")
// 	// s3.ExecuteTemplate(os.Stdout, "footer", nil)
// 	// fmt.Println(s3)
// 	// s3.Execute(os.Stdout, nil)
// }

// func prepareFooter() string {
// 	templateObj, err := template.New("templateTest").Parse(GetView("templates/footer"))
// 	helper.Check(err)

// 	done := helper.Capture()
// 	err = templateObj.Execute(os.Stdout, struct{}{})
// 	helper.Check(err)

// 	capturedOutput, err := done()
// 	helper.Check(err)

// 	return capturedOutput
// }
