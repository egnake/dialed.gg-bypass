document.querySelectorAll('.flat-dialed-panel').forEach(e => e.remove());

const panel = document.createElement('div');
panel.className = 'flat-dialed-panel';
panel.style.cssText = `
    position: fixed; top: 50%; left: 20px; transform: translateY(-50%); z-index: 999999;
    background-color: #1c1c1e; border: 1px solid #38383a; border-radius: 12px;
    padding: 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    text-align: center; width: 240px; color: #ffffff;
`;

const header = document.createElement('div');
header.innerText = 'HEDEF FREKANS';
header.style.cssText = 'color: #8e8e93; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 16px;';

const result = document.createElement('div');
result.innerText = '---';
result.style.cssText = 'font-size: 42px; font-weight: 300; margin-bottom: 24px; font-variant-numeric: tabular-nums; letter-spacing: -1px;';

const btn = document.createElement('button');
btn.innerText = 'DİNLEMEYİ BAŞLAT';
btn.style.cssText = `
    background-color: #0a84ff; color: #fff; border: none; padding: 12px;
    width: 100%; font-size: 14px; font-weight: 600; border-radius: 8px;
    cursor: pointer; transition: opacity 0.2s; outline: none;
`;
btn.onmouseover = () => btn.style.opacity = '0.8';
btn.onmouseout = () => btn.style.opacity = '1';

panel.appendChild(header);
panel.appendChild(result);
panel.appendChild(btn);
document.body.appendChild(panel);

let state = 'IDLE'; 
let capturedFreqs = [];
let captureTimer = null;

btn.addEventListener('click', () => {
    state = 'ARMED';
    capturedFreqs = [];
    btn.innerText = 'SES BEKLENİYOR...';
    btn.style.backgroundColor = '#ff9f0a'; 
    result.innerText = 'Hazır';
    result.style.color = '#ffffff';
});

const processFrequencies = () => {
    state = 'IDLE';
    
    let validFreqs = capturedFreqs.filter(f => f > 20);
    
    if (validFreqs.length === 0) {
        result.innerText = 'HATA';
        result.style.color = '#ff453a'; 
        btn.innerText = 'TEKRAR DENE';
        btn.style.backgroundColor = '#0a84ff';
        return;
    }

    let minFreq = Math.min(...validFreqs);
    let calculatedTarget = minFreq * 2;
    
    let exactTarget = validFreqs.find(f => Math.abs(f - calculatedTarget) < 1);
    
    if (!exactTarget) {
        exactTarget = calculatedTarget; 
    }

    result.innerText = exactTarget.toFixed(2) + ' Hz';
    result.style.color = '#30d158'; 
    btn.innerText = 'YENİDEN YAKALA';
    btn.style.backgroundColor = '#0a84ff'; 
};

// Tetikleyici Mantığı
const triggerCapture = (val) => {
    if (state === 'ARMED' && val > 20) {
        state = 'CAPTURING';
        capturedFreqs.push(val);
        btn.innerText = 'ANALİZ...';
        
        clearTimeout(captureTimer);
        captureTimer = setTimeout(processFrequencies, 150);
    } else if (state === 'CAPTURING' && val > 20) {
        capturedFreqs.push(val);
    }
};

if (!window.__audioHookedV4) {
    const O_AudioContext = window.AudioContext || window.webkitAudioContext;
    const origCreate = O_AudioContext.prototype.createOscillator;

    O_AudioContext.prototype.createOscillator = function() {
        const osc = origCreate.apply(this, arguments);
        
        const origStart = osc.start;
        osc.start = function() {
            triggerCapture(osc.frequency.value);
            return origStart.apply(this, arguments);
        };

        const origSetValue = osc.frequency.setValueAtTime;
        osc.frequency.setValueAtTime = function(val, time) {
            triggerCapture(val);
            return origSetValue.apply(this, arguments);
        };

        return osc;
    };
    window.__audioHookedV4 = true;
}