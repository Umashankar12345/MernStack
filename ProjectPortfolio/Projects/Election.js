let bjpCount = 0;
let congressCount = 0;
let notaCount = 0;

// Update total votes display
function updateTotalVotes() {
    const total = bjpCount + congressCount + notaCount;
    document.getElementById("totalVotes").innerText = total;
}

// Hide all results (not needed in this version as we show all simultaneously)
function hideAll() {
    // Commented out as we want to show all results
    // document.getElementById("Bjpresult").innerText = "";
    // document.getElementById("congressresult").innerText = "";
    // document.getElementById("notaresult").innerText = "";
}

// Voting functions
function voteBjp() {
    bjpCount++;
    document.getElementById("Bjpresult").innerText = bjpCount + " votes";
    updateTotalVotes();
    showVoteAnimation("BJP");
}

function voteCongress() {
    congressCount++;
    document.getElementById("congressresult").innerText = congressCount + " votes";
    updateTotalVotes();
    showVoteAnimation("Congress");
}

function voteNota() {
    notaCount++;
    document.getElementById("notaresult").innerText = notaCount + " votes";
    updateTotalVotes();
    showVoteAnimation("NOTA");
}

// Reset all votes
function resetVotes() {
    if (confirm("Are you sure you want to reset all votes?")) {
        bjpCount = 0;
        congressCount = 0;
        notaCount = 0;
        
        document.getElementById("Bjpresult").innerText = "0 votes";
        document.getElementById("congressresult").innerText = "0 votes";
        document.getElementById("notaresult").innerText = "0 votes";
        updateTotalVotes();
        
        alert("All votes have been reset to zero!");
    }
}

// Show vote animation
function showVoteAnimation(party) {
    const btn = document.querySelector(`.${party.toLowerCase()}-btn`);
    btn.style.transform = 'scale(0.95)';
    btn.style.transition = 'transform 0.1s';
    
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 100);
    
    // Show vote confirmation
    const voteMsg = document.createElement('div');
    voteMsg.className = 'vote-confirmation';
    voteMsg.innerHTML = `<i class="fas fa-check-circle"></i> Vote for ${party} recorded!`;
    voteMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.5s, fadeOut 0.5s 1.5s forwards;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(voteMsg);
    
    setTimeout(() => {
        voteMsg.remove();
    }, 2000);
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize display on load
window.onload = function() {
    updateTotalVotes();
};