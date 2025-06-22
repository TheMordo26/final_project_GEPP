<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
class TemplateFormController extends AbstractController
{
    #[Route('/templates/new', name: 'app_new_template')]
    #[IsGranted('ROLE_USER')]
    public function new(): Response
    {
        return $this->render('template_form/new.html.twig', [
        ]);
    }
}