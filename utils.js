const toAsciiCodes = (text) => text.split('').map(char => char.charCodeAt(0)).join(' ');
const fromAsciiCodes = (codes) => codes.split(/[\s,]+/).map(code => String.fromCharCode(parseInt(code, 10))).join('');
const toHex = (text) => text.split('').map(c => c.charCodeAt(0).toString(16)).join(' ');
const fromHex = (hexString) => hexString.split(/[\s,]+/).map(h => String.fromCharCode(parseInt(h, 16))).join('');
const convertBase = (input, fromBase, toBase) => {
    const num = parseInt(input, fromBase);
    if (isNaN(num)) throw new Error(`Invalid number "${input}" for base ${fromBase}`);
    return num.toString(toBase);
};

function parseArgs(arr) {
    let result = {};
    
    arr.forEach(item => {
      let [key, value] = item.split(":");

      key = key.trim();
      value = value.trim();
      
      value = isNaN(value) ? value : parseFloat(value);

      result[key] = value;
    });
    
    return result;
}

function digitZero(number) {
    var prependStr = "";
    if (number < 10)
        prependStr = "0";

    return prependStr + parseInt(number);
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function NormalizeAngle(theta) {
    return theta - Math.PI * 2.0 * Math.floor((theta + Math.PI) / (Math.PI * 2.0));
}

function EnergyToRadius(energy) {
    var f = (energy) / 5000.0;
    if (f > 1.0)
        f = 1.0;
    var add = 0.3 * Math.pow(f, 1 / 3);
    var rootVal = 1.0 / (1.7 + add);
    return Math.pow(energy / 100, rootVal) * 4.0 - 3;
}

function EnergyToRadius2(energy) {
    var f = (energy) / 1000.0;
    if (f > 1.0)
        f = 1.0;
    var rootVal = 1.0 / (1.0 + f);
    return Math.pow(energy / 100, rootVal) * 4.0 - 3;
}

function formatTime(milliseconds) {
    var totalSeconds = parseInt(milliseconds / 1000);

    var totalMinuteValue = totalSeconds / 60;
    var totalMinutes = parseInt(totalMinuteValue);
    var seconds = totalSeconds - totalMinutes * 60;

    var totalHoursValue = totalMinutes / 60;
    var totalHours = parseInt(totalHoursValue);
    var minutes = totalMinutes - totalHours * 60;

    if (totalHours == 0)
        return digitZero(minutes) + ':' + digitZero(seconds);
    else
        return digitZero(totalHours) + ':' + digitZero(minutes) + ':' + digitZero(seconds);
}

const g = 9.81;

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function timeOfFlight(v0, angle) {
    const theta = degToRad(angle);
    return (2 * v0 * Math.sin(theta)) / g;
}

function maxHeight(v0, angle) {
    const theta = degToRad(angle);
    return (Math.pow(v0 * Math.sin(theta), 2)) / (2 * g);
}

function range(v0, angle) {
    const theta = degToRad(angle);
    return (Math.pow(v0, 2) * Math.sin(2 * theta)) / g;
}

function finalVelocity(v0, angle) {
    const theta = degToRad(angle);
    // Velocity components at impact
    const vx = v0 * Math.cos(theta);
    const vy = v0 * Math.sin(theta);
    const t = timeOfFlight(v0, angle);
    const vyFinal = vy - g * t;
    return Math.sqrt(Math.pow(vx, 2) + Math.pow(vyFinal, 2));
}

function positionAtTime(v0, angle, t) {
    const theta = degToRad(angle);
    const x = v0 * Math.cos(theta) * t;
    const y = v0 * Math.sin(theta) * t - 0.5 * g * Math.pow(t, 2);
    return {
        x,
        y
    };
}

function gcd(a, b) {
    if (!b) return a;
    return gcd(b, a % b);
}

function gcd2(...args) {
    if (args.length === 0) {
        throw new Error("At least one argument is required");
    }
    return args.reduce((acc, val) => gcd(acc, val));
}

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

function lcm2(...args) {
    if (args.length === 0) {
        throw new Error("At least one argument is required");
    }
    return args.reduce((acc, val) => lcm(acc, val));
}

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
}

const G = 6.67430e-11;
const M_EARTH = 5.972e24;
const MU = G * M_EARTH;

function orbitalPeriod(semiMajorAxis) {
    return 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / MU);
}

function orbitalVelocity(radius, semiMajorAxis) {
    return Math.sqrt(MU * (2 / radius - 1 / semiMajorAxis));
}

function radiusAtTrueAnomaly(semiMajorAxis, eccentricity, trueAnomaly) {
    return (semiMajorAxis * (1 - Math.pow(eccentricity, 2))) /
           (1 + eccentricity * Math.cos(trueAnomaly));
}

function eccentricAnomalyFromTrueAnomaly(trueAnomaly, eccentricity) {
    const cosE = (eccentricity + Math.cos(trueAnomaly)) /
                 (1 + eccentricity * Math.cos(trueAnomaly));
    return Math.acos(cosE);
}

function meanAnomaly(eccentricAnomaly, eccentricity) {
    return eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly);
}

function solveKepler(meanAnomaly, eccentricity, tolerance = 1e-6) {
    let E = meanAnomaly;
    let delta = 1;

    while (Math.abs(delta) > tolerance) {
        delta = (E - eccentricity * Math.sin(E) - meanAnomaly) / (1 - eccentricity * Math.cos(E));
        E -= delta;
    }

    return E;
}

function electricFieldFromPointCharge(q, r) {
    const k = 8.988e9;
    return k * q / (r * r);
}

function electricPotential(q, r) {
    const k = 8.988e9;
    return k * q / r;
}

function ohmvoltage(I, R) {
    return I * R;
}

function ohmcurrent(V, R) {
    return V / R;
}

function ohmresistance(V, I) {
    return V / I;
}

function capacitance(epsilon, A, d) {
    return (epsilon * A) / d;
}

function energyStoredInCapacitor(C, V) {
    return 0.5 * C * V * V;
}

function magneticFieldFromCurrent(I, r) {
    const mu0 = 4 * Math.PI * 1e-7;
    return (mu0 * I) / (2 * Math.PI * r);
}

function lorentzForce(q, E, v, B) {
    return {
        x: q * (E.x + v.y * B.z - v.z * B.y),
        y: q * (E.y + v.z * B.x - v.x * B.z),
        z: q * (E.z + v.x * B.y - v.y * B.x)
    };
}

function clamp2(v, min, max){
	if(v < min) return min;
	if(v > max) return max;
	return v;
}

function rotateVector(vectorX, vectorY, angle)
{
	var newX = vectorX * Math.cos(angle) - vectorY * Math.sin(angle);
	var newY = vectorY * Math.cos(angle) + vectorX * Math.sin(angle);
	return {
				x: newX,
				y: newY
			}
}

function scaleFunction(fn, xScale = 1, yScale = 1) {
    return function(x) {
        return fn(x / xScale) * yScale;
    }
}

function drawGraph(canvas, ctx, fn, fgColor = '#0bdfff', bgColor = '#000000') {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.lineWidth = 0.5;
    const gridGradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gridGradient.addColorStop(0, '#0ff5');
    gridGradient.addColorStop(1, '#f0f5');
    ctx.strokeStyle = gridGradient;

    ctx.beginPath();
    for (let x = 0; x <= canvasWidth; x += canvasWidth / 10) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
    }
    for (let y = 0; y <= canvasHeight; y += canvasHeight / 10) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
    }
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.scale(1, -1);

    ctx.lineWidth = 2;
    ctx.strokeStyle = fgColor;
    ctx.shadowColor = fgColor;
    ctx.shadowBlur = 15;

    ctx.beginPath();
    let x = -canvasWidth / 2;
    let y = fn(x);
    ctx.moveTo(x, y);

    for (; x < canvasWidth / 2; x += 0.5) {
        y = fn(x);
        ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.restore();
}

function drawProjectileFrame(canvas, ctx, v0, angle, t) {
    const fgColor = '#0bdfff';
    const bgColor = '#000000';
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.lineWidth = 0.5;
    const gridGradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gridGradient.addColorStop(0, '#0ff5');
    gridGradient.addColorStop(1, '#f0f5');
    ctx.strokeStyle = gridGradient;

    ctx.beginPath();
    for (let x = 0; x <= canvasWidth; x += canvasWidth / 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
    }
    for (let y = 0; y <= canvasHeight; y += canvasHeight / 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
    }

    ctx.stroke();
    
    ctx.shadowColor = '#0bdfff';
    ctx.shadowBlur = '#0bdfff';

    ctx.translate(0, canvasHeight);

    ctx.scale(1, -1);

    const {x, y} = positionAtTime(v0, angle, t);
    console.log(x, y);

    ctx.beginPath();

    ctx.arc(x, y, 3, 0, Math.PI * 2);

    ctx.fillStyle = '#0bdfff';
    ctx.fill();

    ctx.closePath();

    ctx.restore();
}

function animateProjectile(canvas, ctx, v0, angle, encoder) {
    let t = 0.01;

    for(let tf = timeOfFlight(v0, angle); t < tf; t+=0.1) {
        drawProjectileFrame(canvas, ctx, v0, angle, t);
        encoder.addFrame(ctx);
    }

    encoder.finish();
}

module.exports = {
    lcm,
    gcd,
    lcm2,
    gcd2,
    drawGraph,
    isPrime,
    scaleFunction,
    toAsciiCodes,
    toHex,
    fromAsciiCodes,
    fromHex,
    convertBase,
    getRandom,
    EnergyToRadius,
    EnergyToRadius2,
    NormalizeAngle,
    formatTime,
    degToRad,
    timeOfFlight,
    maxHeight,
    range,
    finalVelocity,
    positionAtTime,
    animateProjectile,
    drawProjectileFrame,
    parseArgs,
    clamp2,
    rotateVector,
    orbitalPeriod,
    orbitalVelocity,
    radiusAtTrueAnomaly,
    eccentricAnomalyFromTrueAnomaly,
    meanAnomaly,
    solveKepler,
    electricFieldFromPointCharge,
    electricPotential,
    ohmvoltage,
    ohmcurrent,
    ohmresistance,
    capacitance,
    energyStoredInCapacitor,
    magneticFieldFromCurrent,
    lorentzForce
};