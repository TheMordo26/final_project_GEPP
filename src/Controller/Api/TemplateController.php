<?php

namespace App\Controller\Api;

use App\Entity\Template;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/templates')]
#[IsGranted('ROLE_USER')]
class TemplateController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator
    ) {}

    #[Route('', name: 'create_template', methods: ['POST'])]
    public function createTemplate(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $template = $this->serializer->deserialize(
            $request->getContent(),
            Template::class,
            'json',
        );

        /** @var User $user */
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }
        $template->setOwner($user);

        $errors = $this->validator->validate($template);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getPropertyPath() . ': ' . $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($template);
        $this->entityManager->flush();

        return new JsonResponse(
            $this->serializer->serialize($template, 'json', [
            ]),
            Response::HTTP_CREATED,
            [],
            true
        );
    }
}