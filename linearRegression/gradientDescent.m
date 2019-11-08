function [theta, J_history] = gradientDescent(X, y, theta, alpha, num_iters)
%GRADIENTDESCENT Performs gradient descent to learn theta
%   theta = GRADIENTDESENT(X, y, theta, alpha, num_iters) updates theta by
%   taking num_iters gradient steps with learning rate alpha

% Initialize some useful values
m = length(y); % number of training examples
J_history = zeros(num_iters, 1);

for iter = 1:num_iters

    % ====================== YOUR CODE HERE ======================
    % Instructions: Perform a single gradient step on the parameter vector
    %               theta.
    %
    % Hint: While debugging, it can be useful to print out the values
    %       of the cost function (computeCost) and gradient here.
    %


    x1 = X(:,2);
    x2 = X(:,3);

    h = theta(1) + (theta(2)*x1) + (theta(3)*x2) ;

    theta_zero = theta(1) - alpha * (1/m) * sum(h-y);
    theta_one  = theta(2) - alpha * (1/m) * sum((h - y) .* x1);
    theta_two = theta(3) - alpha * (1/m) * sum((h - y) .* x2);

    theta = [theta_zero; theta_one; theta_two];
    % ============================================================

    % Save the cost J in every iteration
    J_history(iter) = computeCost(X, y, theta);
    % disp(J_history(iter));
end
  printf("best J(theta)");
  disp(min(J_history));
end
