class LinkedLists {
    constructor(){
        this.head = new Node();
        this.size = 0;
    }
    append (value, key) {
        let newNode = new Node(value, key);
        let tail = this.head;
        while (tail.nextNode) {
            tail=tail.nextNode;  
        }
        tail.nextNode = newNode;
        this.size++;
    }

    prepend (value) {
        let newNode = new Node(value);
        newNode.nextNode = this.head.nextNode;
        this.head.nextNode = newNode;
        this.size++;
    }

    Size(){
        return this.size;
    }

    Head(){
        if(this.head.nextNode){
            return this.head.nextNode.value;
        }else{
            return 'empty list'
        }
        
    }

    tail (){
        let tail = this.head;
        while (tail.nextNode) {
            tail=tail.nextNode;  
        }
        return tail.value;
    }

    at (index){
        let node = this.head;
        for (let i = -1; i < index; i++) {
            if (node.nextNode) {
                node = node.nextNode;    
            }else{
                return'index not exist';
            }
              
        }
        return node.value;
    }

    upDate (key, value){
        let node = this.head;
        while (node.nextNode) {
            if (node.nextNode.key == key) {
                node.nextNode.value = value; 
                console.log(key +"  UPDATED");
                return;
            }
            node = node.nextNode;
        }
        return false;
    }

    pop(){
        let node = this.head;
        if (!node.nextNode) {
            console.log('empty list')
        }
        while(node.nextNode){
            if (!node.nextNode.nextNode) {
                node.nextNode = null   
            }else{
                node = node.nextNode;
            }
        }
    }

    contains (value){
        let node = this.head;
        while (node.nextNode) {
            node = node.nextNode;
            if (node.value === value) {
                return true;
            }
        }
        return false;
    }

    containsKey (key){
        let node = this.head;
        while (node.nextNode) {
            node = node.nextNode;
            if (node.key === key) {
                return true;
            }
        }
        return false;
    }

    finde (value){
        let node = this.head;
        let index = -1;
        while (node.nextNode) {
            index++;
            node = node.nextNode;
            if (node.value == value) {
                return index;
            }
        }
        return null;
    }

    findeVal (key){
        let node = this.head;
        while (node.nextNode) {
            node = node.nextNode;
            if (node.key == key) {
                return node.value;
            }
        }
        return null;
    }

    toString(node = this.head){
        if (!node.nextNode) {
            return` null`
        }
        node = node.nextNode;
        return `( ${node.value} )-> ${this.toString(node)}`;
    }

    insertAt(value, index){
        if (index>this.size) {
            index = this.size;
        }
        let newnode = new Node(value);
        let node = this.head;
        for (let i = 1; i <= index; i++) {
           if (node.nextNode) {
                node = node.nextNode;
           }
        }
        newnode.nextNode = node.nextNode;
        node.nextNode = newnode;
    }

    removeAt(index){
        if (index>this.size) {
            index = this.size;
        }
        let node = this.head;
        for (let i = 1; i <= index; i++) {
           if (node.nextNode) {
                node = node.nextNode;
           }
        }
        node.nextNode = node.nextNode.nextNode;
    }

    removeKey(key){
        
        let node = this.head;
        while (node.nextNode) {
            if (node.nextNode.key == key) {
                node.nextNode = node.nextNode.nextNode;
                console.log(key+"  REMOVED")
                return
            }
            node = node.nextNode;
        }
        return false
    }
    keys(){
        let node = this.head;
        let keysArr = [];
        while (node.nextNode) {
            keysArr = keysArr.concat([node.nextNode.key]);
            node = node.nextNode;    
        }
        
        return keysArr;         
    }

    values (){
        let node = this.head;
        let valArr = [];
        while (node.nextNode) {
            valArr = valArr.concat([node.nextNode.value]);
            node = node.nextNode;    
        }
        
        return valArr;         
    }

    entries (){
        let node = this.head;
        let entrieArr = [];
        while (node.nextNode) {
            entrieArr = entrieArr.concat([[node.nextNode.key, node.nextNode.value]]);
            node = node.nextNode;    
        }
        
        return entrieArr;    
    }
}

class Node {
    constructor(value=null, key=null){
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

class hashMap {
    constructor(){
        this.arr = [];
        this.arr.length = 16;
        this.loadFactor = 0;
    }

    expandArr(){
        this.arr.length += 16;
    }

    resetLoadFactor(){
        let nodesNum = 0;
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i]) {
                nodesNum += this.arr[i].size;   
            }
        }
        this.loadFactor = 1/(this.arr.length/nodesNum);
    }

    hash(key) {
        let hashCode = 0;   
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i))% this.arr.length;
        }
     
        return hashCode ;
    } 

    set (key, value){
        let hashCode = this.hash(key);
        if (hashCode>=this.arr.length) {
            throw new Error("Trying to access index out of bound");    
        }
        if (!this.arr[hashCode]) {
            let newList = new LinkedLists();
            newList.append(value, key);
            this.arr[hashCode] = newList;
        }else{
            if (!this.arr[hashCode].containsKey(key)) {
                this.arr[hashCode].append(value, key);   
            }else{
                this.arr[hashCode].upDate(key, value);
            }
        } 

        this.resetLoadFactor() ;
        if (this.loadFactor > 0.75) {
            expandArr();
        }
    }

    get(key){
        for (let i = 0; i < this.arr.length; i++) {
            let value;
            if (this.arr[i]) {
                value = this.arr[i].findeVal(key); 
            }
            
            if (value) {
                return value 
            }
        }
        return null;
    }

    remove(key){
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i]) {
                this.arr[i].removeKey(key);
            }
        }
        return null;
    }

    has(key){
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i]) {
                if (this.arr[i].containsKey(key)) {
                    return true;
                }   
            }
            
        }
        return false;
    }

    length(){
        let nodesNum = 0;
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i]) {
                nodesNum += this.arr[i].size;   
            }
        }
        return nodesNum;
    }

    clear(){
        for (let i = 0; i < this.arr.length; i++) {
            this.arr[i] = undefined;
        }
    }

    keys(){
        let allKeys = [];
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i]) {
                allKeys = allKeys.concat(this.arr[i].keys());  
            }
        }   
        return allKeys;
    }

    values (){
        let allVal = [];
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i]) {
                allVal = allVal.concat(this.arr[i].values());  
            }
        }   
        return allVal;
    }

    entries(){
        let allEntries = [];
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i]) {
                allEntries = allEntries.concat(this.arr[i].entries());  
            }
        }   
        return allEntries;
    }
}

