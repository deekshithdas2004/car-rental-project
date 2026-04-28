const cars = [
    { name: 'Lamborghini Aventador', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80', pricePerDay: 2500, description: 'Iconic supercar with V12 engine and scissor doors.', specs: { speed: '217 mph', engine: '6.5L V12', seats: 2, fuel: 'Gasoline' }},
    { name: 'Ferrari 488 GTB', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80', pricePerDay: 2200, description: 'Twin-turbo V8 delivering exhilarating performance.', specs: { speed: '205 mph', engine: '3.9L V8', seats: 2, fuel: 'Gasoline' }},
    { name: 'Rolls Royce Phantom', image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80', pricePerDay: 3000, description: 'Ultimate luxury with handcrafted interior.', specs: { speed: '155 mph', engine: '6.75L V12', seats: 5, fuel: 'Gasoline' }},
    { name: 'Bentley Continental GT', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80', pricePerDay: 1800, description: 'Grand touring luxury with sports car performance.', specs: { speed: '207 mph', engine: '6.0L W12', seats: 4, fuel: 'Gasoline' }},
    { name: 'Porsche 911', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', pricePerDay: 1500, description: 'Legendary sports car with precision engineering.', specs: { speed: '191 mph', engine: '3.0L Flat-6', seats: 4, fuel: 'Gasoline' }},
    { name: 'McLaren 720S', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', pricePerDay: 2300, description: 'Carbon fiber supercar with dihedral doors.', specs: { speed: '212 mph', engine: '4.0L V8', seats: 2, fuel: 'Gasoline' }},
];

cars.forEach(car => {
    fetch('http://localhost:7000/cars', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(car)
    });
});