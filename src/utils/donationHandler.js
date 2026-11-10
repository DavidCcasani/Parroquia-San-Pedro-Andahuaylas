/**
 * Handles all interactive events for the Sagrada Família-styled Donation module
 * Flow:
 *  Step 1: Payment method selection (Yape / Plin vs Transferencia)
 *  Step 2: Donor data form (Name, Surname, Email, Intent)
 *  Step 3: QR code & Bank Accounts according to selected method
 * Returns true if an event was handled, false otherwise.
 */
export function handleDonationClick(e, rootEl) {
  const box = e.target.closest('.card-donaciones-box') || rootEl.querySelector('.card-donaciones-box');
  if (!box) return false;

  // 1. Select payment method in Step 1 ([data-method-select])
  const methodBtn = e.target.closest('[data-method-select]');
  if (methodBtn) {
    e.preventDefault();
    const method = methodBtn.getAttribute('data-method-select');
    box.dataset.selectedMethod = method;

    const allMethodBtns = box.querySelectorAll('[data-method-select]');
    allMethodBtns.forEach((btn) => {
      btn.style.borderColor = '#d0d7de';
      btn.style.backgroundColor = '#ffffff';
      btn.style.color = '#1a1714';
      btn.classList.remove('active');
    });

    methodBtn.style.borderColor = '#c5a059';
    methodBtn.style.backgroundColor = '#c5a059';
    methodBtn.style.color = '#ffffff';
    methodBtn.classList.add('active');
    return true;
  }

  // 2. Move from Step 1 to Step 2 ([data-donacion-next-step="2"])
  const nextToStep2Btn = e.target.closest('[data-donacion-next-step="2"]');
  if (nextToStep2Btn) {
    e.preventDefault();
    const method = box.dataset.selectedMethod || 'yape';

    // Update selected method badge in Step 2
    const methodBadge = box.querySelector('#donacion-metodo-seleccionado-badge');
    if (methodBadge) {
      if (method === 'yape') {
        methodBadge.textContent = 'Yape / Plin';
      } else {
        methodBadge.textContent = 'Transferencia Bancaria';
      }
    }

    // Switch Stepper to Step 2
    updateStepper(box, 2);
    toggleStepView(box, 2);
    return true;
  }

  // 3. Back button from Step 2 to Step 1 ([data-donacion-prev-step="1"])
  const prevToStep1Btn = e.target.closest('[data-donacion-prev-step="1"]');
  if (prevToStep1Btn) {
    e.preventDefault();
    updateStepper(box, 1);
    toggleStepView(box, 1);
    return true;
  }

  // 4. Submit Step 2 to Step 3 ([data-donacion-submit-step2])
  const submitStep2Btn = e.target.closest('[data-donacion-submit-step2]');
  if (submitStep2Btn) {
    e.preventDefault();
    const nombreInput = box.querySelector('#donante-nombre');
    const apellidoInput = box.querySelector('#donante-apellido');
    const emailInput = box.querySelector('#donante-email');
    const mensajeInput = box.querySelector('#donante-mensaje');
    const errorMsg = box.querySelector('#donante-error-msg');

    const nombre = (nombreInput?.value || '').trim();
    const apellido = (apellidoInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const mensaje = (mensajeInput?.value || '').trim();

    if (!nombre || !apellido || !email || !email.includes('@')) {
      if (errorMsg) {
        errorMsg.textContent = 'Por favor completa tu nombre, apellido y un correo electrónico válido.';
        errorMsg.style.display = 'block';
      }
      return true;
    }
    if (errorMsg) errorMsg.style.display = 'none';

    const method = box.dataset.selectedMethod || 'yape';
    box.dataset.donorName = `${nombre} ${apellido}`;
    box.dataset.donorEmail = email;

    // Update Summary in Step 3
    const summaryNameEl = box.querySelector('#donante-summary-name');
    if (summaryNameEl) summaryNameEl.textContent = `${nombre} ${apellido}`;

    // Show panel corresponding to chosen method
    activatePayTab(box, method === 'transferencia' ? 'banco' : 'yape');

    // Update WhatsApp links
    const waLink = box.querySelector('#donacion-wa-comprobante');
    if (waLink) {
      const metodoText = method === 'transferencia' ? 'Transferencia Bancaria' : 'Yape/Plin';
      let waText = `Paz y Bien. Mi nombre es ${nombre} ${apellido} (${email}). Adjunto constancia de mi aportación vía ${metodoText} para la Parroquia San Pedro de Andahuaylas.`;
      if (mensaje) {
        waText += ` Intención: "${mensaje}"`;
      }
      waLink.setAttribute('href', `https://wa.me/51984123456?text=${encodeURIComponent(waText)}`);
    }

    // Switch Stepper to Step 3
    updateStepper(box, 3);
    toggleStepView(box, 3);
    return true;
  }

  // 5. Back button from Step 3 to Step 2 ([data-donacion-prev-step="2"])
  const prevToStep2Btn = e.target.closest('[data-donacion-prev-step="2"]');
  if (prevToStep2Btn) {
    e.preventDefault();
    updateStepper(box, 2);
    toggleStepView(box, 2);
    return true;
  }

  // 6. Payment method tabs in Step 3 ([data-pay-tab])
  const payTabBtn = e.target.closest('[data-pay-tab]');
  if (payTabBtn) {
    e.preventDefault();
    const tabName = payTabBtn.getAttribute('data-pay-tab');
    activatePayTab(box, tabName);
    return true;
  }

  // 7. Reset donation flow to start another ([data-donacion-reiniciar])
  const reiniciarBtn = e.target.closest('[data-donacion-reiniciar]');
  if (reiniciarBtn) {
    e.preventDefault();
    updateStepper(box, 1);
    toggleStepView(box, 1);
    return true;
  }

  return false;
}

/** Helper: updates tab styles & panels in Step 3 matching the reference design */
function activatePayTab(box, tabName) {
  const allTabs = box.querySelectorAll('[data-pay-tab]');
  allTabs.forEach((btn) => {
    btn.style.backgroundColor = '#ffffff';
    btn.style.color = '#1a1714';
    btn.style.borderColor = '#d0d7de';
  });

  const activeBtn = box.querySelector(`[data-pay-tab="${tabName}"]`);
  if (activeBtn) {
    activeBtn.style.backgroundColor = '#c5a059';
    activeBtn.style.color = '#ffffff';
    activeBtn.style.borderColor = '#c5a059';
  }

  const panelYape = box.querySelector('#donacion-panel-yape');
  const panelBanco = box.querySelector('#donacion-panel-banco');
  if (panelYape) panelYape.style.display = tabName === 'yape' ? 'block' : 'none';
  if (panelBanco) panelBanco.style.display = tabName === 'banco' ? 'block' : 'none';
}

/** Helper: updates the 3-step visual stepper */
function updateStepper(box, stepNumber) {
  const step1Circle = box.querySelector('#step-circle-1');
  const step2Circle = box.querySelector('#step-circle-2');
  const step3Circle = box.querySelector('#step-circle-3');
  const line12 = box.querySelector('#step-line-1-2');
  const line23 = box.querySelector('#step-line-2-3');

  const setCircle = (circle, state, numberText) => {
    if (!circle) return;
    if (state === 'active') {
      circle.style.backgroundColor = '#c5a059';
      circle.style.color = '#ffffff';
      circle.style.borderColor = '#c5a059';
      circle.innerHTML = numberText;
    } else if (state === 'completed') {
      circle.style.backgroundColor = '#c5a059';
      circle.style.color = '#ffffff';
      circle.style.borderColor = '#c5a059';
      circle.innerHTML = '<i class="fa fa-check" style="font-size:12px;"></i>';
    } else {
      circle.style.backgroundColor = '#ffffff';
      circle.style.color = '#222222';
      circle.style.borderColor = '#d0d7de';
      circle.innerHTML = numberText;
    }
  };

  if (stepNumber === 1) {
    setCircle(step1Circle, 'active', '1');
    setCircle(step2Circle, 'inactive', '2');
    setCircle(step3Circle, 'inactive', '3');
    if (line12) line12.style.backgroundColor = '#d0d7de';
    if (line23) line23.style.backgroundColor = '#d0d7de';
  } else if (stepNumber === 2) {
    setCircle(step1Circle, 'completed', '1');
    setCircle(step2Circle, 'active', '2');
    setCircle(step3Circle, 'inactive', '3');
    if (line12) line12.style.backgroundColor = '#c5a059';
    if (line23) line23.style.backgroundColor = '#d0d7de';
  } else if (stepNumber === 3) {
    setCircle(step1Circle, 'completed', '1');
    setCircle(step2Circle, 'completed', '2');
    setCircle(step3Circle, 'active', '3');
    if (line12) line12.style.backgroundColor = '#c5a059';
    if (line23) line23.style.backgroundColor = '#c5a059';
  }
}

/** Helper: toggles visibility between step 1, 2, and 3 */
function toggleStepView(box, stepNumber) {
  const step1 = box.querySelector('#donacion-step-1');
  const step2 = box.querySelector('#donacion-step-2');
  const step3 = box.querySelector('#donacion-step-3');

  if (step1) step1.style.display = stepNumber === 1 ? 'block' : 'none';
  if (step2) step2.style.display = stepNumber === 2 ? 'block' : 'none';
  if (step3) step3.style.display = stepNumber === 3 ? 'block' : 'none';
}
