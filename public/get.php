<?php
use LastFmApi\Api\AuthApi;
use LastFmApi\Api\UserApi;

function view($object)
{
    header('Content-Type: application/json; charset=utf-8');
    return json_encode($object, JSON_NUMERIC_CHECK);
}

if (!file_exists('../vendor/autoload.php')) {
    die(view(['error' => 'Please run "composer install" in the main directory first!']));
}

require_once '../vendor/autoload.php';

if (!file_exists('../.apikey')) {
    die(view(['error' => 'API key file missing! Create a file called ".apikey" in the root directory and place your last.fm api key in there.']));
}

$api_key = trim(file_get_contents('../.apikey'));

$auth = new AuthApi('setsession', ['apiKey' => $api_key]);
$user = new UserApi($auth);
$now = $user->getRecentTracks(['user' => (isset($_GET['u']) ? $_GET['u'] : ''), 'limit' => '1']);

if ($now === false) {
    $now = ['error' => 'User not found.'];
}

echo view($now);
