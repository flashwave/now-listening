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

if (!file_exists('../config.ini')) {
    die(view(['error' => 'Configuration missing! Make a copy of config.example.ini named config.ini and set your API key.']));
}

$config = parse_ini_file('../config.ini');

$auth = new AuthApi('setsession', ['apiKey' => $config['api_key']]);
$user = new UserApi($auth);
$now = $user->getRecentTracks(['user' => (isset($_GET['u']) ? $_GET['u'] : ''), 'limit' => '1']);

if ($now === false) {
    $now = ['error' => 'User not found.'];
}

echo view($now);
