<?php
/**
 * PANCANN - Newsletter Subscription Handler
 * 
 * This script handles AJAX POST requests from the newsletter subscription form.
 * It validates the email and sends a notification to the specified recipient.
 */

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email and remove whitespace.
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    // Check that data was sent to the mailer.
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Por favor, insira um e-mail válido.";
        exit;
    }

    // Set the recipient email address.
    $recipient = "contact@pancanncbd.com";

    // Set the email subject.
    $subject = "Nova Inscrição na Newsletter - PANCANN";

    // Build the email content.
    $email_content = "Um novo usuário se inscreveu na newsletter:\n\n";
    $email_content .= "E-mail: $email\n";
    $email_content .= "Data: " . date("Y-m-d H:i:s") . "\n";

    // Build the email headers.
    $email_headers = "From: Newsletter PANCANN <no-reply@pancanncbd.com>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Obrigado! Sua inscrição foi realizada com sucesso.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Ops! Ocorreu um erro ao processar sua inscrição. Tente novamente mais tarde.";
    }
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "Houve um problema com sua submissão. Por favor, tente novamente.";
}
