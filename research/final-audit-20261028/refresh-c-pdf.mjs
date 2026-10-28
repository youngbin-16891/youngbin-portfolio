import fs from 'node:fs';
import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage();await p.goto('http://127.0.0.1:4197/reports/idle-operations.html',{waitUntil:'networkidle'});await p.pdf({path:'dist/reports/idle-operations.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});await b.close();console.log('C PDF refreshed');
