package main

import (
//	"flag"
//	"io"
//	"log"
	"net/http"
//	"github.com/gorilla/sessions"
//	"github.com/gorilla/mux"
)

//var (
//	port = flag.String("port", "80", "Enter the port number, defaults to 80")
//)

func main() {

//	router := mux.NewRouter()
	
	http.Handle("/", http.FileServer(http.Dir("./templates")))
	//http.Handle("/static/js/*", http.FileServer(http.Dir("./static/js")))
	//router.Handle("/", http.FileServer(http.Dir("./templates")))
	//router.Handle("/", http.FileServer(http.Dir("./templates")))
	//router.Handle("/", http.FileServer(http.Dir("./templates")))

	fileServer := http.StripPrefix("/static/", http.FileServer(http.Dir("static")))
	http.Handle("/static/", fileServer)

	imageServer := http.StripPrefix("/images/", http.FileServer(http.Dir("static/images")))
	http.Handle("/images/", imageServer)
	
	http.ListenAndServe(":8000", nil)

}

//func HomePage(w http.ResponseWriter, r *http.Request) {

//	http.FileServer(http.Dir("./templates"))
	//	io.WriteString(w, "heelo, world!\n")
//}
