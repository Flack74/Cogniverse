package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Sample route
	r.GET("/api/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to Cogniverse API"})
	})

	fmt.Println("🚀 Server running on http://localhost:8080")
	r.Run(":8080")
}
