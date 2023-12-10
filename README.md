# Protokoli MATF mudraca

### Short intro

### Dir structure

### Usage÷ & Installation

To install the project make sure you have at least >= 16.6.0 version of nodejs installed on the machine you're trying to run the project on. After that, run the following command within the root level of the project directory.
```
npm install
```

After the installation, you can check out all the available scripts you can run in this project by typing the following command in your terminal at the root level of the directory:
```
npm run
```
This command should prompt you with the available commands.

To run the Bot in production mode, run `npm run start:prod`.

### TODOs & WIPs

- explain the logic behind bot simulations

### Ideas

- Simulacija protivnickih modula, simulation module in a worther
- prednosti pojedinaca na pocetku
- iskoriscavanje "bezanja" protivnika, verovatno ce neko implementirati takvu metodu

### TODOs

- training & production envs
- implementiraj watch game skripte 
- Pretvori ovaj projekat u nesto slicno hardhat taskovima te da mozemo svoje recepte i strategije da pravimo

- [x] Winston logger
- [x] Valid move checker
- [ ] Strategy Modules - start implementing strategy & logic modules that would help us make the best move
- [ ] Logging - implement elaborate logging that would help us with trial & error
- [ ] Connector - validate responses in case you make an invalid move. Dont let that break our system
- [x] Connector - imeplemt some way of picking one of predefined actions, as in { "move" } and feed them with proper data
- [ ] Evaluators - add evaluators
- [ ] Favorizer - implement a favorizer that would favorize a strategy in favor of others based on evaluations

### Terminologija 

Metode sa nazivima "train" u sebi se odnose na komunikaciju sa igrom u stanju "treniranja / testiranja". Koriste se izvan "produkcije"



