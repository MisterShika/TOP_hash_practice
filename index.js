class HashItem{
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.next = null;
    }

    setNext(next){
        this.next = next;
    }

    getKey(){
        return this.key;
    }

    getNext(){
        return this.next;
    }

    getValue(){
        return this.value;
    }

    getTail(){
        let theTail = this;
        while(this.getNext() != null){
            theTail = theTail.getNext();
        }
        return theTail;
    }
}

class HashMap {
    constructor(){
        this.capacity = 16;
        this.loadFactor = .75;
        this.buckets = new Array(this.capacity).fill(null);
    }

    hash(key){
        let hashedKey = 0;
        const primeNumber = 31;
        for (let i = 0; i<key.length; i++){
            hashedKey = primeNumber * hashedKey + key.charCodeAt(i);
        }
        hashedKey = hashedKey % this.capacity;
        return hashedKey;
    }

    set(key, value){
        let hashedKey = this.hash(key);
        let inputItem = new HashItem(hashedKey, value);
        if(this.buckets[hashedKey] === null){
            this.buckets[hashedKey] = inputItem;
        }else{
            let theTail = this.buckets[hashedKey].getTail();
            theTail.setNext(inputItem);
        }
    }

    get(key){
        let hashedKey = this.hash(key);
        if(this.buckets[hashedKey] != null){
            return this.buckets[hashedKey];
        }else{
            return null;
        }
    }

    has(key){
        let hashedKey = this.hash(key);
        if(this.buckets[hashedKey] != null){
            return true;
        }else{
            return false;
        }
    }

    remove(key){
        let hashedKey = this.hash(key);
        if(this.buckets[hashedKey] != null){
            this.buckets[hashedKey] = null;
            return true;
        }else{
            return false;
        }
    }

    clear(){
        for(let i = 0; i < this.capacity; i++){
            this.buckets[i] = null;
        }
        return true;
    }

    keys(){
        let keyArray = [];
        for(let i = 0; i < this.capacity; i++){
            if(this.buckets[i] != null){
                keyArray.push(this.buckets[i].getKey());
            }
        }
        return keyArray;
    }

    values(){
        let valuesArray = [];
        for(let i = 0; i < this.capacity; i++){
            if(this.buckets[i] != null){
                valuesArray.push(this.buckets[i].getValue());
                let childCheck = this.buckets[i].getNext();
                while(childCheck != null){
                    valuesArray.push(childCheck.getValue());
                    childCheck = childCheck.getNext();
                }
            }
        }
        return valuesArray;
    }

    length(){
        let returnedLength = 0;
        for(let i = 0; i < this.capacity; i++){
            if(this.buckets[i] != null){
                returnedLength++;
                let currentItem = this.buckets[i];
                while(currentItem.getNext() != null){
                    returnedLength++;
                    currentItem = currentItem.getNext();
                }
            }
        }
        return returnedLength;
    }

    entries(){
        let valuesArray = [];
        for(let i = 0; i < this.capacity; i++){
            if(this.buckets[i] != null){
                let thisEntry = []
                thisEntry.push(this.buckets[i].getValue());
                thisEntry.push(this.buckets[i].getKey());
                valuesArray.push(thisEntry);
                let childCheck = this.buckets[i].getNext();
                while(childCheck != null){
                    thisEntry = []
                    thisEntry.push(childCheck.getValue());
                    thisEntry.push(childCheck.getKey());
                    valuesArray.push(thisEntry);
                    childCheck = childCheck.getNext();
                }
            }
        }
        return valuesArray;
    }

    printBuckets(){
        return this.buckets;
    }
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.printBuckets());
console.log(test.entries());