beforeEach(() => {
  cy.visit("http://127.0.0.1:8080/");
});

describe("Login and Logout Flow", () => {
  
  const validEmail = "ingebrigtfb@stud.noroff.no";
  const validPassword = "ingebrigtfb";
  const invalidEmail = "megafeil@stud.noroff.no";
  const invalidPassword = "detteskalværefeil";

  it("should allow the user to log in with valid credentials", () => {
    
    cy.wait(2000); 

    cy.get("#registerForm > div.modal-footer > button.btn.btn-outline-success")
      .first()
      .click();

    
    cy.wait(1000); 

    
    cy.get("#loginEmail").type(validEmail);
    cy.get("#loginPassword").type(validPassword);

    
    cy.wait(500); 

    
    cy.get('#loginForm button[type="submit"]').click();

    cy.wait(2000); 
    
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      const profile = win.localStorage.getItem("profile");
      expect(token).to.exist; 
      expect(profile).to.exist; 
    });

    
    cy.get('button[data-auth="logout"]').should("be.visible");
  });

  it("should not allow the user to submit the login form with invalid credentials and show an error message", () => {
    cy.wait(2000);
  
    cy.get("#registerForm > div.modal-footer > button.btn.btn-outline-success")
      .first()
      .click();

    
    cy.wait(1000); 

    
    cy.get("#loginEmail").type(invalidEmail);
    cy.get("#loginPassword").type(invalidPassword);

    
    cy.wait(500); 

    
    cy.get('#loginForm button[type="submit"]').click();

    
    cy.contains("Invalid email or password").should("be.visible");

   
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      const profile = win.localStorage.getItem("profile");
      expect(token).to.be.null; 
      expect(profile).to.be.null; 
    });
  });

  it("should allow the user to log out using the logout button", () => {
    cy.wait(2000); 
    
    cy.get("#registerForm > div.modal-footer > button.btn.btn-outline-success")
      .first()
      .click();
    cy.wait(1000); 
    cy.get("#loginEmail").type(validEmail);
    cy.get("#loginPassword").type(validPassword);
    cy.wait(500); 
    cy.get('#loginForm button[type="submit"]').click();

    
    cy.get('button[data-auth="logout"]').should("be.visible");

   
    cy.get('button[data-auth="logout"]').click();
    cy.wait(2000); 
  
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      const profile = win.localStorage.getItem("profile");
      expect(token).to.be.null; 
      expect(profile).to.be.null;
    });

   
    cy.get('button[data-auth="login"]').should("be.visible");
  });
});
