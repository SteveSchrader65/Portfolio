<?php
  if (isset($_POST['email'])) {

  $email_to = "steve36lives@hotmail.com";
  $email_subject = "Contact from Portfolio";

  function problem($error) {
    echo "There are some problems with your form data: <br><br>";
    echo $error . "<br><br>";
    echo "Please fix errors to proceed.<br><br>";
    die();
  }

  // Check for validation errors
  if (!isset($_POST['fullName']) || !isset($_POST['email']) || !isset($_POST['message'])) {
    problem('There are some problems with your form data');
  }

  $name = $_POST['fullName'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $forward = $_POST['forward'];
  $error_message = "";
  $email_regex = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if (!preg_match($email_regex, $email)) {
    $error_message .= 'Your e-mail address appears to be invalid<br>';
  }

  $string_regex = "/^[A-Za-z .'-]+$/";

  if (!preg_match($string_regex, $name)) {
    $error_message .= 'Name entered appears to be invalid<br>';
  }

  if (strlen($message) < 6) {
    $error_message .= 'Message should be 5 characters or more<br>';
  }

  if (strlen($error_message) > 0) {
    problem($error_message);
  }

  $email_message = "Name: " . clean_string($name) . "\n";
  $email_message .= "Email: " . clean_string($email) . "\n";
  $email_message .= "Message: " . clean_string($message) . "\n";

  // Create e-mail headers
  $headers = "Message from Portfolio web-site: " . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

  @mail($email_to, $email_subject, $email_message, $headers);

  // If $forward is checked, send copy to inputted e-mail address
  if ($forward) {
    $copy_subject = "Copy of Contact Message sent to Steve Schrader:\n\n";
    $copy_message = "Message: " . clean_string($message) . "\n";
    $copy_headers = "Sent to: Steve Schrader @" . $email_to . "\r\n" .
      'X-Mailer: PHP/' . phpversion();

    @mail($email, $copy_subject, $copy_message, $copy_headers);
  }

  function clean_string($string) {
    $bad = array("content-type", "bcc:", "to:", "cc:", "href");
    return str_replace($bad, "", $string);
  }
?>

Thank you for your message. Steve will be in touch as soon as possible.
<?php
}