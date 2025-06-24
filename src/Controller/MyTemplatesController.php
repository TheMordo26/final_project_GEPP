<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class MyTemplatesController extends AbstractController
{
    #[Route('/my-templates', name: 'app_my_templates')]
    #[IsGranted('ROLE_USER')]
    public function index(): Response
    {
        return $this->render('my_templates/index.html.twig');
    }
}