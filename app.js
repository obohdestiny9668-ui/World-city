// City Prime Bank - App JavaScript

// Global State
let currentAccount = 0;
let balanceHidden = false;
const originalBalance = '$64,600.00';

// Account Data
const accounts = [
    {
        type: 'Fiat Account',
        bank: 'CITY PRIME BANK',
        number: '•••• 8308',
        balance: '$64,600.00',
        currency: 'USD'
    },
    {
        type: 'Bitcoin Wallet',
        bank: 'BTC WALLET',
        number: '•••• 4A8F',
        balance: '0.847 BTC',
        currency: 'BTC'
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 60000);
    
    // Setup transfer amount input listener
    const transferInput = document.getElementById('transfer-amount');
    if (transferInput) {
        transferInput.addEventListener('input', updateTransferSummary);
    }
});

// Update Time Display
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes);
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Navigation
function navigateTo(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update bottom nav
    updateBottomNav(page);
    
    // Show/hide bottom nav based on page
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
        if (page === 'landing') {
            bottomNav.style.display = 'none';
        } else {
            bottomNav.style.display = 'flex';
        }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Update Bottom Navigation
function updateBottomNav(activePage) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const pageMap = {
        'dashboard': 2,
        'activity': 0,
        'transfer': 1,
        'cards': 3,
        'profile': 4
    };
    
    if (pageMap[activePage] !== undefined) {
        navItems[pageMap[activePage]].classList.add('active');
    }
}

// Switch Account (Fiat/Bitcoin)
function switchAccount(index) {
    currentAccount = index;
    const account = accounts[index];
    
    // Update card
    const card = document.getElementById('account-card');
    const cardType = document.getElementById('card-type');
    const cardBank = document.getElementById('card-bank-name');
    const cardNumber = document.getElementById('card-number');
    const balanceAmount = document.getElementById('balance-amount');
    const dots = document.querySelectorAll('.card-dot');
    
    if (index === 1) {
        card.classList.add('bitcoin');
    } else {
        card.classList.remove('bitcoin');
    }
    
    if (cardType) cardType.textContent = account.type;
    if (cardBank) cardBank.textContent = account.bank;
    if (cardNumber) cardNumber.textContent = account.number;
    if (balanceAmount) balanceAmount.textContent = account.balance;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Toggle Balance Visibility
function toggleBalance() {
    balanceHidden = !balanceHidden;
    const balanceElement = document.getElementById('balance-amount');
    if (balanceElement) {
        balanceElement.textContent = balanceHidden ? '••••••••' : accounts[currentAccount].balance;
    }
}

// Toggle Theme
function toggleTheme() {
    showToast('Theme toggle coming soon');
}

// Show Notifications
function showNotifications() {
    showToast('You have 4 new notifications');
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function openSendModal() {
    openModal('send-modal');
}

function openReceiveModal() {
    openModal('receive-modal');
}

function openMoreModal() {
    openModal('more-modal');
}

// Copy Address
function copyAddress() {
    const address = 'bc1qna84ynaf3n77qcqg449mpt75k670e3h9uze4a8';
    navigator.clipboard.writeText(address).then(() => {
        showToast('Address copied to clipboard');
    }).catch(() => {
        showToast('Failed to copy address');
    });
}

// Share Address
function shareAddress() {
    if (navigator.share) {
        navigator.share({
            title: 'My Bitcoin Address',
            text: 'bc1qna84ynaf3n77qcqg449mpt75k670e3h9uze4a8'
        });
    } else {
        showToast('Share coming soon');
    }
}

// Transfer Functions
function setTransferAmount(amount) {
    const input = document.getElementById('transfer-amount');
    if (input) {
        input.value = amount;
        updateTransferSummary();
    }
    
    // Update active state
    document.querySelectorAll('.quick-amount').forEach(el => {
        el.classList.remove('active');
    });
    event.target.classList.add('active');
}

function updateTransferSummary() {
    const input = document.getElementById('transfer-amount');
    const summaryAmount = document.getElementById('summary-amount');
    const totalAmount = document.getElementById('total-amount');
    
    if (input && summaryAmount && totalAmount) {
        const amount = parseFloat(input.value) || 0;
        const formatted = '$' + amount.toFixed(2);
        summaryAmount.textContent = formatted;
        totalAmount.textContent = formatted;
    }
}

function previewTransfer() {
    const input = document.getElementById('transfer-amount');
    const amount = input ? parseFloat(input.value) : 0;
    
    if (amount <= 0) {
        showToast('Please enter a valid amount');
        return;
    }
    
    showToast('Transfer preview: $' + amount.toFixed(2));
}

function saveBeneficiary() {
    showToast('Beneficiary saved successfully');
}

// Deposit Functions
function selectDepositMethod(element, method) {
    document.querySelectorAll('.deposit-method').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
}

function setDepositAmount(amount) {
    const input = document.getElementById('deposit-amount');
    if (input) {
        input.value = amount;
    }
}

function continueToDeposit() {
    const input = document.getElementById('deposit-amount');
    const amount = input ? parseFloat(input.value) : 0;
    
    if (amount <= 0) {
        showToast('Please enter a valid amount');
        return;
    }
    
    // Update payment page amount
    const paymentAmount = document.getElementById('payment-amount');
    if (paymentAmount) {
        paymentAmount.textContent = '$' + amount + ' USD';
    }
    
    navigateTo('payment');
}

// Payment Functions
function submitPayment() {
    showToast('Payment submitted for verification');
    setTimeout(() => {
        navigateTo('dashboard');
    }, 1500);
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Filter buttons for Activity page
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
    }
});

// Close modals on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// Swipe gesture for account card
let touchStartX = 0;
let touchEndX = 0;

const accountCard = document.getElementById('account-card');
if (accountCard) {
    accountCard.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    accountCard.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next account
            switchAccount((currentAccount + 1) % accounts.length);
        } else {
            // Swipe right - previous account
            switchAccount((currentAccount - 1 + accounts.length) % accounts.length);
        }
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});
