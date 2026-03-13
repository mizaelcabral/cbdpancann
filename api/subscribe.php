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

    // Build the email content (HTML).
    $html_content = "Um novo usuário se inscreveu na newsletter:<br><br>";
    $html_content .= "<strong>E-mail:</strong> $email<br>";
    $html_content .= "<strong>Data:</strong> " . date("Y-m-d H:i:s");

    // Resend API Integration
    $api_key = 're_NH2JPZ4d_5f5BrJ4SmxqqRbhY6HnooPh5';
    
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'from' => 'Newsletter <onboarding@resend.dev>', // Use verified domain once verified
        'to' => [$recipient],
        'subject' => $subject,
        'html' => $html_content,
        'reply_to' => $email
    ]));

    $headers = [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json'
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code == 200 || $http_code == 201) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Obrigado! Sua inscrição foi realizada com sucesso.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Ops! Ocorreu um erro ao processar sua inscrição. Erro: " . $result;
    }
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "Houve um problema com sua submissão. Por favor, tente novamente.";
}
