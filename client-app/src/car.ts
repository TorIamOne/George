
export interface ICar {
    color: String;
    model: String;
    topSpeed?: number;
}
const car1: ICar = {
    color: 'blue',
    model: 'BMW'
}
const car2: ICar = {
    color: 'yellow',
    model: 'Mercedes',
    topSpeed: 100
}

// const multiply = (x: number, y: number) => {
//     x*y
// }
export const cars = [car1, car2];
