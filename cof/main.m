clear ; close all; clc

load ('data/ex8_movies.mat');

fprintf('Average rating for movie 1 (Toy Story): %f / 5\n\n', ...
        mean(Y(1, R(1, :))));

imagesc(Y);
ylabel('Movies');
xlabel('Users');

load ('data/ex8_movieParams.mat');

num_users = 4; num_movies = 5; num_features = 3;
% 减少样本
X = X(1:num_movies, 1:num_features);
% 减少参数
Theta = Theta(1:num_users, 1:num_features);
Y = Y(1:num_movies, 1:num_users);
R = R(1:num_movies, 1:num_users);

J = cofiCostFunc([X(:) ; Theta(:)], Y, R, num_users, num_movies, ...
               num_features, 0);

fprintf(['Cost at loaded parameters: %f '...
         '\n(this value should be about 22.22)\n'], J);



fprintf('\nChecking Gradients (without regularization) ... \n');

%  Check gradients by running checkNNGradients
checkCostFunction;


J = cofiCostFunc([X(:) ; Theta(:)], Y, R, num_users, num_movies, ...
               num_features, 1.5);

fprintf(['Cost at loaded parameters (lambda = 1.5): %f '...
         '\n(this value should be about 31.34)\n'], J);


fprintf('\nChecking Gradients (with regularization) ... \n');

%  Check gradients by running checkNNGradients
checkCostFunction(1.5);
