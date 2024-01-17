package main

import (
	"fmt"
	"sort"
)

func main() {
	fmt.Println("HEllo")
	var a []int = []int{2, 3, 1, 444, 6, 0, 7}
	sort.Ints(a)
	fmt.Print(a)

}
