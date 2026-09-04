const fs = require('fs');

const path = 'src/component/Sidebar.tsx';
let content = fs.readFileSync(path, 'utf8');

const lightLogoReplace = `<div className="d-flex align-items-center justify-content-center">
                                <img src={logoSm} alt="logo" height="24" />
                                <h4 className="mb-0 ms-2 text-white fw-bold" style={{letterSpacing: '1px'}}>Smart Cart</h4>
                            </div>`;

const darkLogoReplace = `<div className="d-flex align-items-center justify-content-center">
                                <img src={logoSm} alt="logo" height="24" />
                                <h4 className="mb-0 ms-2 text-dark fw-bold" style={{letterSpacing: '1px'}}>Smart Cart</h4>
                            </div>`;

content = content.replace('<img src={logoLight} alt="logo" height="24" />', lightLogoReplace);
content = content.replace('<img src={logoDark} alt="logo" height="24" />', darkLogoReplace);

fs.writeFileSync(path, content, 'utf8');
console.log('Sidebar logo text replaced');
