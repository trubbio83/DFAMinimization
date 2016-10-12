Set.prototype.isSuperset = function(subset) {
    for (var elem of subset) {
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
}

Set.prototype.union = function(setB) {
    var union = new Set(this);
    for (var elem of setB) {
        union.add(elem);
    }
    return union;
}

Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}

Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}


var DFA = function(transition, final, start) {
  this.transition = transition;
  this.final = final;
  this.start = start
};

DFA.prototype.states = function (){
			var states = new Set();
      for (var key in this.transition) {
      if (this.transition.hasOwnProperty(key)) {
       if (!states.has(key))
					{
						states.add(parseInt(key));
				}
      }
		}
		return states;
		};
    
DFA.prototype.alphabet = function (){
			var alphabet = new Set();
      
      for (var key in this.transition) {
      if (this.transition.hasOwnProperty(key)) {
       for (var symbol in this.transition[key])
				{
					if (!alphabet.has(symbol))
					{
						alphabet.add(symbol);
					}
				}
      }
		}
		return alphabet;
};
DFA.prototype.test = function (string) {
			var state = this.start,
			index = 0;
			var length = string.length;
			var transition = this.transition;
			while (index < length) {
      	state = transition[state][string.charAt(index++)];
        
				if (typeof state === "undefined")
					return false;
			}

			return this.final.indexOf(state) >= 0;
		};
/*
let reachable_states:= {q0};
let new_states:= {q0};
do {
    temp := the empty set;
    for each q in new_states do
        for all c in Σ do
            temp := temp ∪ {p such that p=δ(q,c)};
        end;
    end;
    new_states := temp \ reachable_states;
    reachable_states := reachable_states ∪ new_states;
} while(new_states ≠ the empty set);
unreachable_states := Q \ reachable_states;
*/

DFA.prototype.unreachable = function(dfa){
	var reachable_states = new Set().add(this.start);
  var new_states = new Set().add(this.start);
  var transition = this.transition;
  do{
    var temp = new Set();

    new_states.forEach(function (q) {
      dfa.alphabet().forEach(function(c){
          var tstate = transition[q][c];
          if(tstate !== "undefined")
              temp.add(tstate);
      });
    });
    new_states = temp.difference(reachable_states);
    reachable_states = reachable_states.union(new_states);
  }while(new_states.size != 0);
  var unreachable_states = dfa.states().difference(reachable_states);
  return unreachable_states;
}


var dfa = new DFA({1: {"a":1,"b":2}, 2:{"a":1,"b":2},3:{"a":1,"b":2}}, [1], 1);
//console.log(dfa.alphabet());
//console.log(dfa.test("abbba"));
console.log(dfa.unreachable(dfa));

/**
TEST operation
var setA = new Set([1,2,3,4]),
    setB = new Set([2,3]),
    setC = new Set([3,4,5,6]);

setA.isSuperset(setB); // => true
setA.union(setC); // => Set [1, 2, 3, 4, 5, 6]
setA.intersection(setC); // => Set [3, 4]
setA.difference(setC); // => Set [1, 2]
console.log(setA);
**/
