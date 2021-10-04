export default class UserRole {
    constructor (inactivityTimer) {
        if (inactivityTimer <= 0) {
            throw new Error('The number must be positive');
        }

        this.inactivityTimer = inactivityTimer;
        this.timer = undefined;

        //Change opacity to activate WSS
        const activateScr = () => {
            document.getElementById('screen').style.opacity = 1;
        }
        //Change opacity to deactivate WSS and stop execution setTimeout, then starts again
        const deactivateScr = () => {
            document.getElementById('screen').style.opacity = 0;
            clearTimeout(this.timer);
            turnOn();
        }
        //call setTimeOut with given timer and callback function
        const turnOn = () => {
            this.timer = setTimeout(activateScr, this.inactivityTimer);
        }
        //detects mouse/keyborad and callback function
        const turnOff = () => {
            document.addEventListener("click", deactivateScr);
            document.addEventListener("keyup", deactivateScr);
            document.addEventListener("scroll", deactivateScr);
            document.addEventListener("mousemove", deactivateScr);
        }

        

        
        turnOn();
        turnOff();
        
    }
}