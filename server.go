package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type Task struct {
	id      string
	content string
	state   string
}

func enableCors(responseWriter *http.ResponseWriter) {
	(*responseWriter).Header().Set("Access-Control-Allow-Origin", "*")
	(*responseWriter).Header().Set("Access-Control-Allow-Headers", "*")
}

func setContentTypeToJson(responseWriter *http.ResponseWriter) {
	(*responseWriter).Header().Set("Content-Type", "application/json")
}

func (t *Task) UnmarshalJSON(buf []byte) error {
	temp := []interface{}{&t.id, &t.content, &t.state}
	taskLen := len(temp)

	if err := json.Unmarshal(buf, &temp); err != nil {
		return err
	}

	if x, y := len(temp), taskLen; x != y {
		return fmt.Errorf("Wrong number of fields in Task: %d != %d", x, y)
	}

	return nil
}

func requestHandler(responseWriter http.ResponseWriter, request *http.Request) {
	enableCors(&responseWriter)
	setContentTypeToJson(&responseWriter)

	if request.Method == "POST" {
		if body := request.Body; body != nil {
			b, _ := io.ReadAll(body)
			fmt.Println(string(b))

			// send response as json, content type already set as json above
			jsonResp, err := json.Marshal(map[string]string{"success": "true"})

			if err != nil {
				log.Fatal(err)
				return
			}

			responseWriter.Write(jsonResp)
			body.Close()
		} else {
			log.Fatal("empty body found")
		}
	} else {
		return
	}
}

func main() {
	http.HandleFunc("/request", requestHandler)

	port := "9999"
	url := fmt.Sprintf("http://localhost:%s/request", port)
	fmt.Println(url)

	http.ListenAndServe(":9999", nil)
}
